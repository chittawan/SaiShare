import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  setUser(userId: string, userName: string) {
    var user = {
      'userId': userId,
      'userName': userName
    }
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return new Promise((resolve, reject) => {
      var userJson = window.localStorage.getItem('user');
      if (userJson) {
        resolve(JSON.parse(userJson));
      }
      resolve(false);
    });
  }

}
