import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export const IS_ACCESS_TOKEN_REQURED = new HttpContextToken<boolean>(() => false);
export const IS_REFRESH_TOKEN_REQURED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private static addHeader(request: HttpRequest<any>): HttpRequest<any> {
    if (request.context.get(IS_ACCESS_TOKEN_REQURED)) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const headers = request.headers.set('Authorization', `Bearer ${token}`);
      return request.clone({ headers });
    }

    if (request.context.get(IS_REFRESH_TOKEN_REQURED)) {
      const token = localStorage.getItem(REFRESH_TOKEN);
      const headers = request.headers.set('Authorization', `Bearer ${token}`);
      return request.clone({ headers });
    }

    return request;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(AuthInterceptor.addHeader(request));
  }
}
