import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.css']
})
export class HeaderFilterComponent implements OnInit {
  // Definicion de variables
  @Input() genres: string[];
  genre = '';
  platforms: string[];
  platform = '';
  @Input() games: Game[];
  inputFilter = '';
  filtersGame = [];
  originalGames: Game[];
  mostrarFormulario = false;
  @Output() eventFilterInput = new EventEmitter<Game[]>();
  gamesTest: Game[] = [];
  error = '';
  constructor(
    private gameService: GamesService,
  ) {
  }
  ngOnInit(): void {
  }
  /*Obtiene los juegos por nombre pero de la variable games que se llena por input proveniente del componente padre Game
  Hay que filtrarlo de esta manera ya que la API no tiene un endpoint para filtrar por nombre.*/
  filterInput(value) {
    this.filtersGame = this.games.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    this.eventFilterInput.emit(this.filtersGame);
    this.gamesTest = this.filtersGame;
    return this.filtersGame;
  }
  // Obtiene los juegos por genero y/o plataforma a traves de GamesService que contacta a la API
  getByGenreOrPlarform() {
    let result = [];
    this.gameService.getFilter(this.genre, this.platform).subscribe(data => {
      result = data;
      this.eventFilterInput.emit(data);
      this.gamesTest = data;
    }, () => {
      this.error = 'Error fetching games';
    });
  }
  /*Este metodo se encarga de determinar como se llenara en en componente list-games.
  En caso de usar los filtros combinados, se encargara de interceptar los filtrados por nombre (que son
  obtenidos desde la variable game en el componente padre) y los obtenidos por categoria o plataforma */
  watcherFilters() {
    if (this.inputFilter === '' && (this.genre !== '' || this.platform !== '')) {
      this.getByGenreOrPlarform();
    }
    else if (this.inputFilter !== '' && (this.genre === '' && this.platform === '')) {
      this.filterInput(this.inputFilter);
    } else if (this.inputFilter === '' && this.genre === '' && this.platform === '') {
      this.eventFilterInput.emit(this.games);
      this.gamesTest = this.games;
    } else {
      this.gameService.getFilter(this.genre, this.platform).subscribe(data => {
        const arrayIn = new Set(this.filterInput(this.inputFilter).map(item => item.id));
        const gamesFiltered: Game[] = data.filter(item => arrayIn.has(item.id));
        this.eventFilterInput.emit(gamesFiltered);
        this.gamesTest = gamesFiltered;
      }), () => {
        this.error = 'Error fetching games';
      };
    }
  }

}
