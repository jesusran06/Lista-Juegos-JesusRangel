import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GamesService } from 'src/app/services/games.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let serviceGame: GamesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [GameComponent]
    })
      .compileComponents();
    serviceGame = TestBed.inject(GamesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call games from service', () => {
    component = fixture.componentInstance;
    const mySpy = spyOn(serviceGame, 'getAllGames').and.callThrough();
    component.ngOnInit();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });
});
