import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'full' },
      {
        path: 'game',
        loadChildren: () =>
          import('./components/game/game.module').then((m) => m.GameModule),
      }
    ],
  },
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
