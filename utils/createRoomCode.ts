import isRoomCodeExist from "./isRoomCodeExist";

export default async function createRoomCode(): Promise<string> {
    const chars = '0123456789ABCDEF';
    
    let isUnique = false;
    let result = '';

    while (!isUnique) {
        const randomValues = new Uint32Array(5);
        crypto.getRandomValues(randomValues);
        
        const codeArray: string[] = [];
        for (let i = 0; i < 5; i++) {
            codeArray.push(chars[randomValues[i] % chars.length]);
        }
        
        const duplicateIndex = randomValues[0] % 5;
        codeArray.push(codeArray[duplicateIndex]);
        
        const shuffleValues = new Uint32Array(6);
        crypto.getRandomValues(shuffleValues);
        for (let i = 5; i > 0; i--) {
            const j = shuffleValues[i] % (i + 1);
            [codeArray[i], codeArray[j]] = [codeArray[j], codeArray[i]];
        }
        
        result = codeArray.join('');
        
        const exists = await isRoomCodeExist(result);
        if (!exists) {
            isUnique = true;
        }
    }

    return result;
}