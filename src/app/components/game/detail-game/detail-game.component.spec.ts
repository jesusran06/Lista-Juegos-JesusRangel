import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailGameComponent } from './detail-game.component';
import { routes } from '../game-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { detailsMock } from 'src/app/mock/games';


describe('DetailGameComponent', () => {
  let component: DetailGameComponent;
  let fixture: ComponentFixture<DetailGameComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let gameServiceMock: jasmine.SpyObj<GamesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    activatedRouteMock = {
      paramMap: of({
        get: (param: string) => {
          if (param === 'id') {
            return '452';
          }
          return null;
        },
      }) as any,
    };
    gameServiceMock = jasmine.createSpyObj('GameService', ['getGameById']);
    await TestBed.configureTestingModule({
      declarations: [DetailGameComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: GamesService, useValue: gameServiceMock },
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch game details on init', fakeAsync(() => {
    gameServiceMock.getGameById.and.returnValue(of(detailsMock));
    component.getDetails();
    tick();
    expect(gameServiceMock.getGameById).toHaveBeenCalledWith('452');
    expect(component.game).toEqual(detailsMock);
  }));

  it('should go back to listGame', () => {
    component.isLoading = false;
    fixture.detectChanges();
    spyOn(component, 'openList');
    const button = fixture.nativeElement.querySelector('.button-back-glitch');
    button.click();
    expect(component.openList).toHaveBeenCalled();
  });
});
