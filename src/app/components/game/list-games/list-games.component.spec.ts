import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGamesComponent } from './list-games.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../game-routing.module';
import { Router } from '@angular/router';
import { gamesMock } from 'src/app/mock/games';

describe('ListGamesComponent', () => {
  let component: ListGamesComponent;
  let fixture: ComponentFixture<ListGamesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [{ provide: Router, useValue: spy }],
      declarations: [ListGamesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGamesComponent);
    component = fixture.componentInstance;
    component.games = gamesMock;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should card games from HTML', () => {
    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['game/detailGame', { id: 540 }]);
  });
});
