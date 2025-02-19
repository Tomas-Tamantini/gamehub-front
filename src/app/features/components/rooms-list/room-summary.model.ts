export interface RoomSummary {
    roomId: number;
    capacity: number;
    playerIds: string[];
    offlinePlayers: string[];
    isFull: boolean;
}