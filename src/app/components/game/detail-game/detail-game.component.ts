import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { GameDetail } from 'src/app/models/game.model';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styleUrls: ['./detail-game.component.css']
})
export class DetailGameComponent implements OnInit {
  // Definicion de variables
  game: GameDetail;
  isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GamesService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getDetails();
  }
  // Obtiene los detalles del juego que se quiere ver. El ID llega por router
  getDetails() {
    this.activatedRoute.paramMap.pipe(
      filter((params) => (params != null)),
      map((params: ParamMap) => {
        const id = params.get('id');
        return id;
      }),
      switchMap((obj: string) =>
        this.gameService.getGameById(obj)
      )
    ).subscribe((data: GameDetail) => {
      this.game = data;
      this.game.release_date = moment(this.game.release_date).format('L');
      this.isLoading = false;
    });
  }
  // Abre la pagina principal
  openList() {
    this.router.navigate(['game/listGame']);
  }
}
