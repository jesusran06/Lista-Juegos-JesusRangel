import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game, GameDetail } from '../models/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  // Obtenemos la url de la api que esta en el enviroment.ts para su uso en toda la aplicacion
  private apiUrl = `${environment.api_url}`;
  constructor(
    private http: HttpClient,

  ) { }
  // Obtiene todos los juegos
  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl + 'games?sort-by=alphabetical');
  }
  // Obtiene un juego por su id. Trae mas informacion que los datos que trae el getAllGames
  getGameById(id): Observable<GameDetail> {
    return this.http.get<GameDetail>(this.apiUrl + 'game?id=' + id);
  }
  // Obtiene los juegos por categoria y/o plataforma. Los ordena alfabeticamente
  getFilter(genre, platform): Observable<Game[]> {
    return this.http.get<Game[]>(
      this.apiUrl +
      'games?' +
      (genre !== '' ? 'category=' + genre + '&' : '') +
      (platform !== '' ? 'platform=' + platform + '&' : '') +
      'sort-by=Alphabetical');
  }
}
