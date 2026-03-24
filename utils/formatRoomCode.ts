
/**
 * Format room code to uppercase and add hyphens every 3 characters
 * @param code string - Room code to format
 * @returns string - Formatted room code
 */
export default function formatRoomCode(code: string) {
    const rawValue = code.toUpperCase().replace(/[^A-F0-9]/g, '').slice(0, 6);
    let formattedValue = rawValue.match(/.{1,3}/g)?.join('-') || '';

    if (code.endsWith('-') && rawValue.length > 0 && rawValue.length % 3 === 0 && rawValue.length < 6) {
        formattedValue += '-';
    }

    return formattedValue;
}