export function camelToSnake(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(camelToSnake);
    }
    else if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                camelToSnake(value),
            ])
        );
    }
    else return obj;
}

export function snakeToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    } else if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
                snakeToCamel(value),
            ])
        );
    }
    return obj;
}