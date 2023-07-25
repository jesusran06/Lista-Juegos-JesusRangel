import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { DetailGameComponent } from './detail-game/detail-game.component';
import { AppComponent } from 'src/app/app.component';

export const routes: Routes = [

  {
    path: '', component: AppComponent,
    children:
      [
        { path: '', redirectTo: 'listGame', pathMatch: 'full' },
        { path: 'listGame', component: GameComponent },
        { path: 'detailGame', component: DetailGameComponent },
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }

