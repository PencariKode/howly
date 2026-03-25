import { RawRoleConfig, RoleAbilityLimit, RoleConfig, RolePowerWeightHuman, RolePowerWeightWolf } from "@/types/roleconfig";

export const humanRoleWeights: RolePowerWeightHuman = {
    warga: 0.4,
    peramal: 2,
    penyihir: 1.75,
    pemburu: 3,
    dukun: 2,
    raja: 4,
};
export const werewolfRoleWeights: RolePowerWeightWolf = {
    werewolf: 3.25,
    blackwolf: 5.25,
    shapeshifter: 6,
};

export class RoleBalance {
    protected playerCount: number;
    // protected humanRoleWeights: RolePowerWeightHuman;
    // protected werewolfRoleWeights: RolePowerWeightWolf;
    protected rawRole: RawRoleConfig | undefined;
    protected roleConfig: RoleConfig;
    protected setRoleConfig: (roleConfig: RoleConfig) => void;


    constructor(playerCount: number, roleConfig: RoleConfig, setRoleConfig: (roleConfig: RoleConfig) => void) {
        this.playerCount = playerCount;
        this.roleConfig = roleConfig;
        this.setRoleConfig = setRoleConfig;

    }

    _adjustRoleRecommendations(config: RawRoleConfig) {
        const { recom, min, max } = config;

        // Pastikan max setiap role minimal sama dengan recom jika recom > 0
        Object.keys(recom).forEach((role) => {
            const roleKey = role as keyof typeof recom;
            if (recom[roleKey] > 0 && max[roleKey] < recom[roleKey]) {
                max[roleKey] = recom[roleKey];
            }
        });


        // Pastikan total role rekomendasi tidak melebihi jumlah pemain
        let totalRecom = Object.values(recom).reduce((sum, value) => sum + value, 0);

        while (totalRecom < this.playerCount) {

            if (recom.warga < max.warga) recom.warga++;
            else if (recom.peramal < max.peramal) recom.peramal++;
            else if (recom.penyihir < max.penyihir) recom.penyihir++;
            else if (recom.pemburu < max.pemburu) recom.pemburu++;
            else if (recom.dukun < max.dukun) recom.dukun++;
            else if (recom.raja < max.raja) recom.raja++;
            else {
                if (recom.werewolf < max.werewolf) recom.werewolf++;
                else if (recom.blackwolf < max.blackwolf) recom.blackwolf++;
                else if (recom.shapeshifter < max.shapeshifter) recom.shapeshifter++;
            }
            totalRecom += 1;
        }

        while (totalRecom > this.playerCount) {
            if (recom.shapeshifter > min.shapeshifter) recom.shapeshifter--;
            else if (recom.blackwolf > min.blackwolf) recom.blackwolf--;
            else if (recom.werewolf > min.werewolf) recom.werewolf--;
            else {
                if (recom.raja > min.raja) recom.raja--;
                else if (recom.dukun > min.dukun) recom.dukun--;
                else if (recom.pemburu > min.pemburu) recom.pemburu--;
                else if (recom.penyihir > min.penyihir) recom.penyihir--;
                else if (recom.peramal > min.peramal) recom.peramal--;
                else if (recom.warga > min.warga) recom.warga--;
            }
            totalRecom -= 1;
        }

        return config;
    }

    getRoleConfiguration() {
        const config: RawRoleConfig = {
            min: {
                warga: Math.max(1, Math.floor(this.playerCount * 0.3)), // Minimal 30% pemain
                peramal: 1,
                penyihir: 1,
                pemburu: this.playerCount < 9 ? 0 : 1,
                dukun: this.playerCount >= 10 ? 1 : 0,
                raja: 0,
                werewolf: 1,
                blackwolf: this.playerCount >= 30 ? 1 : 0,
                shapeshifter: 0
            },
            max: {
                warga: Math.floor(this.playerCount * 0.65), // Maksimal 65% pemain
                peramal: this.playerCount >= 30 ? 3 : 2, // Maksimal 3 untuk game besar
                penyihir: this.playerCount >= 30 ? 4 : 2, // Maksimal 4 untuk game besar
                pemburu: this.playerCount >= 30 ? 2 : 1, // Maksimal 2 untuk game besar
                dukun: this.playerCount >= 30 ? 3 : 1, // Maksimal 3 untuk game besar
                raja: this.playerCount >= 30 ? 1 : 0, // Maksimal 1, hanya untuk game besar
                werewolf: Math.min(6, Math.ceil(this.playerCount / 5)), // Maksimal 1 per 5 pemain
                blackwolf: this.playerCount >= 30 ? 2 : 1, // Maksimal 2 untuk game besar
                shapeshifter: this.playerCount >= 30 ? 1 : 0 // Maksimal 1, hanya untuk game besar
            },
            recom: {
                warga: Math.floor(this.playerCount * 0.4), // Rekomendasi 40% pemain
                peramal: this.playerCount >= 20 ? 2 : 1,
                penyihir: this.playerCount >= 20 ? this.playerCount >= 30 ? 3 : 2 : 1,
                pemburu: this.playerCount >= 20 ? 2 : this.playerCount < 9 ? 0 : 1,
                dukun: this.playerCount >= 15 ? 1 : 0,
                raja: this.playerCount >= 20 ? 1 : 0,
                werewolf: Math.min(4, Math.ceil(this.playerCount / 7)), // Rekomendasi 1 per 7 pemain
                blackwolf: this.playerCount >= 15 ? this.playerCount >= 35 ? 2 : 1 : 0,
                shapeshifter: this.playerCount >= 28 ? 1 : 0
            }
        };

        this.rawRole = this._adjustRoleRecommendations(config);
        return this.rawRole;
    }

    calculateHumanStrength(roles: RoleConfig) {
        let total = 0;
        for (const [role, count] of Object.entries(roles)) {
            if (humanRoleWeights[role as keyof RolePowerWeightHuman]) {
                total += count * humanRoleWeights[role as keyof RolePowerWeightHuman];
            }
        }
        return total;
    }

    calculateWerewolfStrength(roles: RoleConfig) {
        let total = 0;
        for (const [role, count] of Object.entries(roles)) {
            if (werewolfRoleWeights[role as keyof RolePowerWeightWolf]) {
                total += count * werewolfRoleWeights[role as keyof RolePowerWeightWolf];
            }
        }
        return total;
    }

    getHumanPercentage(roles: RoleConfig) {
        const totalHumanStrength = this.calculateHumanStrength(roles);
        const totalWerewolfStrength = this.calculateWerewolfStrength(roles);
        return (totalHumanStrength / (totalHumanStrength + totalWerewolfStrength)) * 100;
    }

    getWerewolfPercentage(roles: RoleConfig) {
        return 100 - this.getHumanPercentage(roles);
    }

    getAbilityLimits(): RoleAbilityLimit {
        return {
            penyihir: Math.min(3, 1 + Math.floor(this.playerCount / 15)),
            blackwolf: 1,
            shapeshifter: Math.min(2, Math.floor(this.playerCount / 20)),
            peramal: Math.min(5, Math.floor(this.playerCount / 10)), // Maksimal 5 kali
            pemburu: Math.min(5, Math.floor(this.playerCount / 10)), // Maksimal 3 kali
            dukun: Math.min(4, Math.floor(this.playerCount / 10)), // Maksimal 4 kali
            raja: Math.min(3, Math.floor(this.playerCount / 10)) // Maksimal 3 kali mencuri suara
        };
    }


    // _adjustRoleOverflow(roleConfig: RoleConfig) {
    //     const totalAmountConfig = Object.values(roleConfig).reduce((a, b) => a + b, 0);
    //     if (totalAmountConfig > this.playerCount) {

    //     }
    // }

    getTotalRoleAmount(roleConfig: RoleConfig) {
        return Object.values(roleConfig).reduce((total, count) => total + count, 0);
    }

    setRoleAmount(role: keyof RoleConfig, amount: number) {
        // Create a copy of the current configuration to work with
        const updatedRoleConfig = { ...this.roleConfig };

        // Set the requested role to the specified amount
        updatedRoleConfig[role] = amount;

        let totalAmountConfig = this.getTotalRoleAmount(updatedRoleConfig);
        const roleOrderedByPower = Object.entries({ ...humanRoleWeights, ...werewolfRoleWeights })
            .sort((a, b) => a[1] - b[1]).map(([key]) => key) as (keyof RoleConfig)[];

        // Get minimum values to prevent reducing below minimums
        const minValues = this.rawRole ? this.rawRole.min : {
            warga: 1, peramal: 1, penyihir: 1, pemburu: 0,
            dukun: 0, raja: 0, werewolf: 1, blackwolf: 0, shapeshifter: 0
        };

        // Reduce roles if total exceeds player count
        let reduced = false;
        while (totalAmountConfig > this.playerCount) {
            reduced = false;
            for (const roleKey of roleOrderedByPower) {
                if (roleKey === role) continue;
                if (updatedRoleConfig[roleKey] > (minValues[roleKey] || 0)) {
                    updatedRoleConfig[roleKey]--;
                    totalAmountConfig--;
                    reduced = true;
                    break;
                }
            }

            if (!reduced) break;
        }

        this.roleConfig = updatedRoleConfig;
        this.setRoleConfig(updatedRoleConfig);
    }

}


export default RoleBalance;