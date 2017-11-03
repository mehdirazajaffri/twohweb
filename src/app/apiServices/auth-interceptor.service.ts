import { Injectable } from '@angular/core';
import {Request, Response} from '@angular/http';
import {Observable} from 'rxjs';
 
import {HttpInterceptor} from 'angular2-http-interceptor';

import { SpinnerService } from './spinner.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {
// export class AuthInterceptorService {

  constructor(public spinner: SpinnerService) { }
  before(request: Request): Request {
    this.spinner.start();
    let currentUser = JSON.parse(localStorage.getItem('user'));
       if (currentUser && currentUser.token_id) {
           request.headers.set('Authorization', currentUser.token_id );
       }
    console.log(request);
    return request;
  }
 
  after(res: Observable<Response>): Observable<any> {
    //do something ...
    console.log(res);
    return res;
  }
}
