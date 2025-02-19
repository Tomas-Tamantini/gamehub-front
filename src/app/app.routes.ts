import { Routes } from '@angular/router';
import { RoomsListComponent } from './features/components/rooms-list/rooms-list.component';
import { GameRoomComponent } from './features/components/game-room/game-room.component';

export const routes: Routes = [
    { path: '', redirectTo: 'rooms', pathMatch: 'full' },
    { path: 'rooms', component: RoomsListComponent },
    { path: 'room/:id', component: GameRoomComponent }
];
