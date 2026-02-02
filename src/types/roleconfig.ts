export interface RoleConfig {
    warga: number;
    peramal: number;
    penyihir: number;
    pemburu: number;
    dukun: number;
    raja: number;
    werewolf: number;
    blackwolf: number;
    shapeshifter: number;
}

export interface RawRoleConfig {
    min: RoleConfig;
    max: RoleConfig;
    recom: RoleConfig;
}

export interface RoleAbilityLimit {
    penyihir: number;
    blackwolf: number;
    shapeshifter: number;
    peramal: number;
    pemburu: number;
    dukun: number;
    raja: number;
}

export interface RolePowerWeightHuman {
    warga: number;
    peramal: number;
    penyihir: number;
    pemburu: number;
    dukun: number;
    raja: number;
}

export interface RolePowerWeightWolf {
    werewolf: number;
    blackwolf: number;
    shapeshifter: number;
}

export interface RolePowerWeight {
    warga: number;
    peramal: number;
    penyihir: number;
    pemburu: number;
    dukun: number;
    raja: number;
    werewolf: number;
    blackwolf: number;
    shapeshifter: number;
}