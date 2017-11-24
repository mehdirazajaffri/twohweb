import { Injectable } from '@angular/core';
import { Headers,RequestOptions } from '@angular/http';

@Injectable()
export class GlobalService {

  constructor() { }
   //public static serverApi = 'http://localhost:3000/api/';
   public static serverApi = 'https://twohserver.herokuapp.com/api/';
   //public static serverApi = 'https://two-h-online-server.herokuapp.com/api/';
  // public static serverApi = 'http://192.168.0.108:3000/api/';
  // public static serverApi = 'https://twohonline-sv.herokuapp.com/api/';
  
  public static jwt() {
  // create authorization header with jwt token
       let currentUser = JSON.parse(localStorage.getItem('user'));
       if (currentUser && currentUser.token_id) {
           // let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token_id });
           let headers = new Headers({ 'Authorization': currentUser.token_id });
           return new RequestOptions({ headers: headers });
       }
   }
}
