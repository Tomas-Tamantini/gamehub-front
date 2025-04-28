import { Card } from '../../../../../core/models/card.model';

export interface Hand {
  cards: Card[];
  isHandToBeat: boolean;
  isBotMove: boolean;
}

export interface Player {
  playerId: string;
  angleAroundTableDegrees: number;
  numPoints: number;
  partialCredit: number;
  isOffline: boolean;
  isTheirTurn: boolean;
  numCards: number;
  cards?: Card[];
  handHistory: Hand[];
  secondsRemainingInTurn?: number;
}
