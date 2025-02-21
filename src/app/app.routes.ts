import { Routes } from '@angular/router';
import { RoomsListComponent } from './features/components/rooms-list/rooms-list.component';
import { GameRoomComponent } from './features/components/game-room/game-room.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'rooms', pathMatch: 'full' },
    { path: 'rooms', component: RoomsListComponent, canActivate: [isLoggedInGuard] },
    { path: 'room/:id', component: GameRoomComponent, canActivate: [isLoggedInGuard] }
];
