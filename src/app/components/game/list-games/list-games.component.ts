import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {
  // Definicion de variables
  @Input() games: Game[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  @Input() isLoading: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
  }
  // Obtiene el total de paginas en relacion al numero de registros
  get totalPages(): number[] {
    const totalItems = this.games?.length;
    return Array.from({ length: Math.ceil(totalItems / this.itemsPerPage) }, (_, i) => i + 1);
  }
  // Cambia de pagina, ya sea a la siguiente, la anterior o una en especifica
  changePage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
  // Redirecciona a la pagina de detalles con el ID del juego por parametro
  openDetails(id) {
    this.router.navigate(['game/detailGame', { id }]);
  }
  // Obtiene los juegos que se mostraran en la pagina actual
  getCurrentPageGames(): Game[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.games?.slice(startIndex, endIndex);
  }
}
