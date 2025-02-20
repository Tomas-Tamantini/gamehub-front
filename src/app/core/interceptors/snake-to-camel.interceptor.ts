import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { snakeToCamel } from '../utils/case-transform';

export const snakeToCamelInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(map(
    e => {
      if (e instanceof HttpResponse) {
        return e.clone({ body: snakeToCamel(e.body) });
      }
      else {
        return e;
      }
    }
  ));

};
