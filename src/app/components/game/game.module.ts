import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGamesComponent } from './list-games/list-games.component';
import { DetailGameComponent } from './detail-game/detail-game.component';
import { HeaderFilterComponent } from './header-filter/header-filter.component';
import { GameRoutingModule } from './game-routing.module';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    ListGamesComponent,
    DetailGameComponent,
    HeaderFilterComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
  ]
})
export class GameModule { }
