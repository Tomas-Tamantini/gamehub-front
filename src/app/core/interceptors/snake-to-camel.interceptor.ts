import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

function snakeToCamel(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((v) => snakeToCamel(v));
  } else if (typeof obj !== 'object') {
    return obj;
  } else {
    return Object.keys(obj).reduce((acc: Record<string, unknown>, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {});
  }
}

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
