import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { isLoggedInGuard } from './is-logged-in.guard';
import { AuthService } from '../services/auth.service';

describe('isLoggedInGuard', () => {
  const mockAuthService = jasmine.createSpyObj("AuthService", ["getPlayerId"]);
  const mockRouter = jasmine.createSpyObj("Router", ["createUrlTree"]);
  let activatedRoute: ActivatedRoute;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter([]),
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
      ],
    });
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    mockAuthService.getPlayerId.and.returnValue("123");
    const guardResponse = executeGuard(activatedRoute.snapshot, {} as RouterStateSnapshot);
    expect(guardResponse).toBeTrue();
  });

  it('should redirect to login page if user is not logged in', () => {
    mockAuthService.getPlayerId.and.returnValue("");
    const guardResponse = executeGuard(activatedRoute.snapshot, {} as RouterStateSnapshot);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(["login"]);
    expect(guardResponse).toEqual(mockRouter.createUrlTree());
  });
});
