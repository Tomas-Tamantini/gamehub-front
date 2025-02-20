import { Card } from "./card.model";
import { GameStatus } from "./game-status.model";

export interface PrivateView {
    status: GameStatus;
    cards: Card[];
}
