export interface Player {
    playerId: string;
    angleAroundTableDegrees: number;
    numPoints: number;
    partialResult: number;
    isOffline: boolean;
    isTheirTurn: boolean;
    numCards: number;
}