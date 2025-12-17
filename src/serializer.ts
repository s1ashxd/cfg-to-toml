import { Value, ConstantsMap } from './types';

function serializeValue(value: Value): string {
    if (typeof value === 'number') {
        const str = value.toString();
        return str.includes('.') ? str : str + '.0';
    }
    if (typeof value === 'string') {
        return `"${value.replace(/"/g, '\\"')}"`;
    }
    if (Array.isArray(value)) {
        return `[${value.map(serializeValue).join(', ')}]`;
    }
    throw new Error('Unsupported value type');
}

export function serializeToTOML(constants: ConstantsMap): string {
    return Array.from(constants.entries())
        .map(([key, value]) => `${key} = ${serializeValue(value)}`)
        .join('\n') + '\n';
}