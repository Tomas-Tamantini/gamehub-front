import { Card } from "../../../../../core/models/card.model";

export default interface Hand {
    cards: Card[];
    isHandToBeat: boolean;
}

export interface Player {
    playerId: string;
    angleAroundTableDegrees: number;
    numPoints: number;
    partialResult: number;
    isOffline: boolean;
    isTheirTurn: boolean;
    numCards: number;
    cards?: Card[];
    handHistory: Hand[];
}