import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CachedAuthenticationService} from '../services/cached.authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cachedAuthenticationService: CachedAuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.set('Authorization', `Bearer ${this.getToken()}`)
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', 'origin,X-Requested-With,content-type,accept')
      .append('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');

    // Let browser figure file boundary
    if (headers.get('Content-Type') === 'multipart/form-data') {
      headers = headers.delete('Content-Type');
    } else if (!headers.get('Content-Type')) {
      headers = headers.append('Content-Type', 'application/json');
    }

    const authReq = req.clone({headers});
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (response: HttpErrorResponse) => {
    }));
  }

  getToken() {
    const {token = ''} = this.cachedAuthenticationService.resolveAuthInfo().profile;
    return token;
  }
}
