import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // Definicion de variables
  games: Game[] = [];
  auxGames: Game[] = [];
  gamesFiltered: Game[] = [];
  isLoading = true;
  genres: string[] = [
    'MMORPG',
    'Shooter',
    'Strategy',
    'Moba',
    'Racing',
    'Sports',
    'Social',
    'Sandbox',
    'Open-World',
    'Survival',
    'PVP',
    'PVE',
    'Pixel',
    'Voxel',
    'Zombie',
    'Turn-Based',
    'First-Person',
    'Third-Person',
    'Top-Down',
    'Tank',
    'Space',
    'Sailing',
    'Side-Scroller',
    'Superhero',
    'Permadeath',
    'Card',
    'Battle-Royale',
    'MMO',
    'MMOFPS',
    'MMOTPS',
    '3D',
    '2D',
    'Anime',
    'Fantasy',
    'Sci-Fi',
    'Fighting',
    'Action-RPG',
    'Action',
    'Military',
    'Martial-Arts',
    'Flight',
    'Low-Spec',
    'Tower-Defense',
    'Horror',
    'MMORTS'
  ];
  constructor(
    private gameService: GamesService,
  ) { }

  ngOnInit(): void {
    this.getAllGames();
  }
  // Obtiene por servicios todos los games
  getAllGames() {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data.sort();
      this.gamesFiltered = this.games;
      this.isLoading = false;
    });
  }
  // Recibe por output los juegos filtrados
  onFilteredInput(event) {
    this.gamesFiltered = event;
  }

}
