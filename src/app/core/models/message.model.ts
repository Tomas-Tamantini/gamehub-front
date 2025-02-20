import { PrivateView } from "./private-view.model";
import { RoomSummary } from "./room-summary.model";
import { SharedGameState } from "./shared-view.model";

export interface ErrorPayload {
    error: string;
}

export interface GameState {
    roomId: number;
    sharedView: SharedGameState | null;
    privateView: PrivateView | null;
}

export interface ErrorMessage {
    messageType: "ERROR";
    payload: ErrorPayload;
}

export interface GameRoomUpdateMessage {
    messageType: "GAME_ROOM_UPDATE";
    payload: RoomSummary;
}

export interface GameStateMessage {
    messageType: "GAME_STATE";
    payload: GameState;
}

export type Message = ErrorMessage | GameRoomUpdateMessage | GameStateMessage;