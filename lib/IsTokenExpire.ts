import jwt from "jsonwebtoken";

export function isTokenExpired(token: string | undefined): boolean {
    if (!token) return true;

    try {
        const decoded = jwt.decode(token);

        if (decoded && typeof decoded !== "string" && "exp" in decoded) {
            const expTimestamp = decoded.exp ? decoded.exp * 1000 : 0;
            const currentTimestamp = Date.now();
            return currentTimestamp > expTimestamp;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
    }

    return true;
}
