import type { RoomRoleConfig } from "@/types/room";

//PK: Fisher-Yates shuffle array in-place
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * PK: Buat array role berdasarkan RoleConfig, lalu acak dan map ke playerIds
 * @returns Map<userId, roleName>
 */
export function randomizeRoles(
  roleConfig: RoomRoleConfig,
  playerIds: string[],
): Map<string, string> {
  const rolePool: string[] = [];

  const roleEntries: [string, number | null][] = [
    ["warga", roleConfig.warga],
    ["werewolf", roleConfig.werewolf],
    ["peramal", roleConfig.peramal],
    ["penyihir", roleConfig.penyihir],
    ["pemburu", roleConfig.pemburu],
    ["dukun", roleConfig.dukun],
    ["raja", roleConfig.raja],
    ["blackwolf", roleConfig.blackwolf],
    ["shapeshifter", roleConfig.shapeshifter],
  ];

  for (const [roleName, count] of roleEntries) {
    if (count && count > 0) {
      for (let i = 0; i < count; i++) {
        rolePool.push(roleName);
      }
    }
  }

  if (rolePool.length !== playerIds.length) {
    throw new Error(
      `Jumlah role (${rolePool.length}) tidak sesuai dengan jumlah pemain (${playerIds.length}).`,
    );
  }

  shuffle(rolePool);

  const result = new Map<string, string>();
  playerIds.forEach((id, index) => {
    result.set(id, rolePool[index]);
  });

  return result;
}
