import { Card } from "./card.model";
import { GameStatus } from "./game-status.model";

export interface SharedPlayerState {
    playerId: string;
    numPoints: number;
    numCards: number;
}

export interface Move {
    playerId: string;
    cards: Card[];
}

export interface PlayerResult {
    playerId: string;
    distToAvg: number;
}

export interface Result {
    players: PlayerResult[];
}

export interface SharedGameState {
    status: GameStatus;
    currentPlayerId?: string;
    players: SharedPlayerState[];
    moveHistory: Move[];
    result?: Result;
}

