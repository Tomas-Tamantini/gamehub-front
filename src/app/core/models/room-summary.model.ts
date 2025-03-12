export interface RoomSummary {
    roomId: number;
    capacity: number;
    playerIds: string[];
    offlinePlayers: string[];
    isFull: boolean;
    configuration: {
        gameOverPointThreshold: number;
        creditsPerPoint: number;
    }
}