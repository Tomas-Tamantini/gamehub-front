export interface Message {
    messageType: "ERROR" | "GAME_ROOM_UPDATE" | "GAME_STATE";
    payload: any;
}

export interface ErrorPayload {
    error: string;
}