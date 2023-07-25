import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GamesService } from './games.service';
import { Game } from '../models/game.model';
import { detailsMock, gamesMock } from '../mock/games';
import { of } from 'rxjs';



describe('GamesService', () => {
  let serviceGame: GamesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    serviceGame = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(serviceGame).toBeTruthy();
  });

  it('should return the getAllGames observable type Game[]', () => {
    const mock: Game[] = gamesMock;
    spyOn(serviceGame, 'getAllGames').and.returnValue(of(mock));
    const result$ = serviceGame.getAllGames();
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(mock);
    });
  });

  it('should get game details by id', () => {
    const mockId = '123';
    spyOn(serviceGame, 'getGameById').and.returnValue(of(detailsMock));
    const result$ = serviceGame.getGameById(mockId);
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(detailsMock);
    });
  });

  it('should get games details by platform, category and sorted', () => {
    const mockPlatform = 'pc';
    const mockCategory = 'Shooter';
    spyOn(serviceGame, 'getFilter').and.returnValue(of(gamesMock));
    const result$ = serviceGame.getFilter(mockCategory, mockPlatform);
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(gamesMock);
    });
  });
});
