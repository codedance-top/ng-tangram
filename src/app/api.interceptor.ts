import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'src/environments/environment';

// Http 请求拦截器配置
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (!req.url.match(/:\/\/|^\/\//)) {
      req = req.clone({ url: 'https://api.linkport.top' + req.url });
    }

    const token = 'eyJhbGciOiJIUzI1NiJ9.TGd4NlZjZjM3REhJDQpzdXBlcg0K6LaF57qn55So5oi3DQpzdXBlcg0K.zksJQiOKHfeGKG70i5sTxysRLHxh5c6p9KMrZwkfJbM';

    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(req);
  }
}
