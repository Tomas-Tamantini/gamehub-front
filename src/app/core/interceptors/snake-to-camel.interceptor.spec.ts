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

  it('should convert response to camel case recursively', () => {
    const snakeCaseResponse = {
      user_id: 1,
      user_addresses: [
        {
          street_name: 'Main Street',
          postal_code: '12345'
        },
        {
          street_name: 'Second Street',
        }
      ]
    }
    const camelCaseResponse = {
      userId: 1,
      userAddresses: [
        {
          streetName: 'Main Street',
          postalCode: '12345'
        },
        {
          streetName: 'Second Street',
        }
      ]
    };

    interceptor({} as any, () => {
      return of(new HttpResponse({ body: snakeCaseResponse }));
    }
    ).subscribe((response) => {
      expect((response as any).body).toEqual(camelCaseResponse);
    });

  });
});
