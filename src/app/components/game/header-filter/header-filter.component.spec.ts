import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeaderFilterComponent } from './header-filter.component';
import { gamesMock } from 'src/app/mock/games';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from 'src/app/services/games.service';
import { of, throwError } from 'rxjs';

describe('HeaderFilterComponent', () => {
  let component: HeaderFilterComponent;
  let fixture: ComponentFixture<HeaderFilterComponent>;
  let gamesService: GamesService;
  let gameServiceMock: jasmine.SpyObj<GamesService>;

  beforeEach(async(() => {
    gameServiceMock = jasmine.createSpyObj('GameService', ['getFilter']);
    TestBed.configureTestingModule({
      declarations: [HeaderFilterComponent],
      imports: [HttpClientModule],
      providers: [GamesService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFilterComponent);
    component = fixture.componentInstance;
    gamesService = TestBed.inject(GamesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method getFilter from getByGenreOrPlarform', fakeAsync(() => {
    const genre = 'Shooter';
    const platform = 'pc';
    const filteredGames = gamesMock;
    const spy = spyOn(gamesService, 'getFilter').and.returnValue(of(filteredGames));
    component.genre = genre;
    component.platform = platform;
    component.getByGenreOrPlarform();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call filterInput from watcherFilters', () => {
    const games = gamesMock;
    const spy = spyOn(component, 'filterInput').and.returnValue(games);
    component.games = games;
    component.inputFilter = 'Example';
    component.watcherFilters();
    expect(spy).toHaveBeenCalled();
  });

  it('should call emit from watcherFilters', () => {
    const spy = spyOn(component.eventFilterInput, 'emit');
    component.games = gamesMock;
    component.watcherFilters();
    expect(spy).toHaveBeenCalledWith(gamesMock);
  });

  it('should return the correct number of games', () => {
    component.games = gamesMock;
    component.inputFilter = 'overwatch 2';
    component.genre = '';
    component.platform = '';
    component.watcherFilters();
    console.log(component.gamesTest);
    expect(component.gamesTest.length).toEqual(1);
  });

});
