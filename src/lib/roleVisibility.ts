const WEREWOLF_ROLES = new Set(["werewolf", "blackwolf", "shapeshifter"]);
const SPECIAL_HUMAN_ROLES = new Set(["peramal", "penyihir", "dukun", "raja"]);

interface RoleCountSource {
    role: string | null;
}

export function buildRoleCounts(players: RoleCountSource[]) {
    const counts: Record<string, number> = {};
    for (const player of players) {
        if (!player.role) continue;
        counts[player.role] = (counts[player.role] ?? 0) + 1;
    }
    return counts;
}

interface RevealRoleOptions {
    targetRole: string | null;
    targetUserId: string;
    targetIsAlive: boolean;
    viewerUserId: string;
    viewerRole: string | null;
    isOwner: boolean;
    roleCounts: Record<string, number>;
}

export function shouldRevealRole({
    targetRole,
    targetUserId,
    targetIsAlive,
    viewerUserId,
    viewerRole,
    isOwner,
    roleCounts,
}: RevealRoleOptions) {
    if (!targetRole) return false;
    if (isOwner) return true;
    if (targetUserId === viewerUserId) return true;
    if (!targetIsAlive) return true;

    if (viewerRole && WEREWOLF_ROLES.has(viewerRole) && WEREWOLF_ROLES.has(targetRole)) {
        return true;
    }

    if (viewerRole && SPECIAL_HUMAN_ROLES.has(viewerRole)) {
        const sameRoleCount = roleCounts[viewerRole] ?? 0;
        if (sameRoleCount > 1 && targetRole === viewerRole) {
            return true;
        }
    }

    return false;
}

export function isWerewolfRole(role: string | null) {
    return role ? WEREWOLF_ROLES.has(role) : false;
}
