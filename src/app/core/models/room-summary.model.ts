interface GameSpecificInfo {
    creditsPerPoint: number;
    pointThreshold: number;
}

export interface RoomSummary {
    roomId: number;
    capacity: number;
    playerIds: string[];
    offlinePlayers: string[];
    isFull: boolean;
    gameSpecificInfo: GameSpecificInfo;
}