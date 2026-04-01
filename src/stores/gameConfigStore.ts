import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleConfig } from '@/types/roleconfig';
import { humanRoleWeights, werewolfRoleWeights } from '@/lib/roleConfig';
import { RoleBalance } from '@/lib/roleConfig';


type RoleCombi = "default" | "custom";

// Game Config Store Types
interface GameConfigState {
    roleCombi: RoleCombi;
    setRoleCombi: (roleCombi: RoleCombi) => void;
    isRoleCombiLocked: boolean;
    setRoleCombiLocked: (isLocked: boolean) => void;
    gameTitle: string;
    setGameTitle: (gameTitle: string) => void;
    playerCount: number;
    setPlayerCount: (playerCount: number) => void;
    roleConfig: RoleConfig;
    setRoleCount: (role: keyof RoleConfig, count: number) => void;
    addRoleByAmount: (role: keyof RoleConfig, amount: number) => void;
    getTotalRoleAmount: () => number;
    setRoleConfig: (roleConfig: RoleConfig) => void;
    reset: () => void;
}

// Check Room Store Types
interface CheckRoomState {
    isJoined: boolean;
    setIsJoined: (isJoined: boolean) => void;
    roomCode: string;
    setRoomCode: (roomCode: string) => void;
    newJoin: boolean;
    setNewJoin: (newJoin: boolean) => void;
    reset: () => void;
}

const DEFAULT_PLAYER_COUNT = 7;

const getDefaultRoles = (count: number): RoleConfig => {
    const rb = new RoleBalance(count, {} as RoleConfig, () => {});
    return rb.getRoleConfiguration().recom;
};

const useGameConfigStore = create<GameConfigState>()(

    persist(
        (set, get) => ({
            roleCombi: "default",
            setRoleCombi: (roleCombi: RoleCombi) => set({ roleCombi }),
            isRoleCombiLocked: false,
            setRoleCombiLocked: (isLocked: boolean) => set({ isRoleCombiLocked: isLocked }),
            gameTitle: "",
            setGameTitle: (gameTitle: string) => set({ gameTitle }),
            playerCount: DEFAULT_PLAYER_COUNT,
            roleConfig: getDefaultRoles(DEFAULT_PLAYER_COUNT),
            setPlayerCount: (playerCount: number) => set({
                playerCount,
                roleConfig: getDefaultRoles(playerCount)
            }),

            setRoleCount: (role: keyof RoleConfig, count: number) => set((state) => ({
                roleConfig: { ...state.roleConfig, [role]: count }
            })),
            setRoleConfig: (roleConfig: RoleConfig) => set({ roleConfig }),
            addRoleByAmount: (role: keyof RoleConfig, amount: number) => set((state) => {
                // Create a copy of the current configuration to work with
                const updatedRoleConfig = {...state.roleConfig};
                
                // Set the requested role to the specified amount
                updatedRoleConfig[role] = amount;
                
                // Calculate the total roles
                const getTotalRoleAmount = (config: RoleConfig) => 
                    Object.values(config).reduce((total, count) => total + count, 0);
                
                let totalAmountConfig = getTotalRoleAmount(updatedRoleConfig);
                
                const roleOrderedByPower = Object.entries({...humanRoleWeights, ...werewolfRoleWeights})
                    .sort((a, b) => b[1] - a[1])
                    .map(([key]) => key) as (keyof RoleConfig)[];
                
                // Define minimum values to prevent reducing below minimums
                const minValues = {
                    warga: 1, peramal: 1, penyihir: 1, pemburu: 0,
                    dukun: 0, raja: 0, werewolf: 1, blackwolf: 0, shapeshifter: 0
                };

                let reduced = false;
                while (totalAmountConfig > state.playerCount) {
                    reduced = false;
                    for (const roleKey of roleOrderedByPower) {
                        // Don't reduce the role being explicitly set
                        if (roleKey === role) continue;
                        
                        // Don't reduce below minimum values
                        if (updatedRoleConfig[roleKey] > (minValues[roleKey] || 0)) {
                            updatedRoleConfig[roleKey]--;
                            totalAmountConfig--;
                            reduced = true;
                            break;
                        }
                    }
                    if (!reduced) break;
                }
                
                // Return the updated state
                return { roleConfig: updatedRoleConfig };
            }),
            getTotalRoleAmount: () => {
                const roleConfig = get().roleConfig;
                return roleConfig ? Object.values(roleConfig).reduce((prev, cur) => prev + cur, 0) : 0;
            },
            reset: () => set({
                roleCombi: "default",
                gameTitle: "",
                playerCount: DEFAULT_PLAYER_COUNT,
                roleConfig: getDefaultRoles(DEFAULT_PLAYER_COUNT)
            }),

        }),
        {
            name: "game-config",
            storage: {
                getItem: (name) => {
                    const value = localStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
            onRehydrateStorage: (state) => {
                console.log("Game Config di-load:", state);
            },
        }
    )
);

export default useGameConfigStore;

export const useCheckRoom = create<CheckRoomState>()(
    persist(
        (set) => ({
            isJoined: false,
            setIsJoined: (isJoined: boolean) => set({ isJoined }),
            roomCode: "",
            setRoomCode: (roomCode: string) => set({ roomCode }),
            newJoin: false,
            setNewJoin: (newJoin: boolean) => set({ newJoin }),
            reset: () => set({
                isJoined: false,
                roomCode: "",
            }),
        }),
        {
            name: "checkRoom",
            storage: {
                getItem: (name) => {
                    const value = localStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
            onRehydrateStorage: (state) => {
                console.log("Check Room loaded:", state);
            },
        }
    )
);