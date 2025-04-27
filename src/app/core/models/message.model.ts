import { PrivateView } from "./private-view.model";
import { RoomSummary } from "./room-summary.model";
import { SharedGameState } from "./shared-view.model";


export interface GameState {
    roomId: number;
    sharedView: SharedGameState | null;
    privateView: PrivateView | null;
}

export interface ErrorMessage {
    messageType: "ERROR";
    payload: { error: string };
}

export interface TurnTimer {
    roomId: number;
    playerId: string;
    secondsRemaining: number;
}

export interface GameRoomUpdateMessage {
    messageType: "GAME_ROOM_UPDATE";
    payload: RoomSummary;
}

export interface GameStateMessage {
    messageType: "GAME_STATE";
    payload: GameState;
}

export interface TurnTimerAlertMessage {
    messageType: "TURN_TIMER_ALERT";
    payload: TurnTimer;
}

export type Message = ErrorMessage | GameRoomUpdateMessage | GameStateMessage | TurnTimerAlertMessage;