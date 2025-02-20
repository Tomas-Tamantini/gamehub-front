import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { snakeToCamelInterceptor } from './snake-to-camel.interceptor';
import { of } from 'rxjs';

describe('snakeToCamelInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => snakeToCamelInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should convert response to camel case', () => {
    const snakeCaseResponse = { user_id: 1 }
    const camelCaseResponse = { userId: 1 };

    interceptor({} as any, () => {
      return of(new HttpResponse({ body: snakeCaseResponse }));
    }
    ).subscribe((response) => {
      expect((response as any).body).toEqual(camelCaseResponse);
    });

  });
});
