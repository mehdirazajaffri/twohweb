import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';

@Injectable()
export class AuthService {

  constructor(private _http:Http) { }
  signInApi = GlobalService.serverApi+'auth/signin';
  registerApi = GlobalService.serverApi+'auth/register';
  login(data) {
       return this._http.post(this.signInApi,data)
           .map(data => {
               data.json();
               console.log("I CAN SEE DATA HERE: ", data.json());
               return data.json();
       });
   }
   create(data){
       return this._http.post(this.registerApi,data)
       .map(data => {
               data.json();
               console.log("I CAN SEE DATA HERE: ", data.json());
               return data.json();
       });
   }
   
//    getFbDetails(userId,accessToken){
//         return this._http.get("https://graph.facebook.com/v2.8/"+userId+"?"+"access_token="+accessToken+"&fields=id,name,email,picture")
//        .map(data => {
//                data.json();
//                console.log("I CAN SEE DATA HERE: ", data.json());
//                return data.json();
//        });
//    }
   abc = GlobalService.serverApi;
   getAbc(){
        return this._http.get(this.abc+"auth/facebook")
       .map(data => {
               data.json();
               console.log("I CAN SEE DATA HERE: ", data.json());
               return data.json();
       });
   }
}
