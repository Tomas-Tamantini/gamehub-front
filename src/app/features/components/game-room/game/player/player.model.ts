export interface Player {
    playerId: string;
    angleAroundTableDegrees: number;
    numPoints: number;
    partialResult: number;
    isOffline: boolean;
    numCards: number;
}