import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

/*
  Generated class for the RoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomProvider {

  constructor(public http: Http) {
    console.log('Hello RoomProvider Provider');
  }

  host = "http://tomsdev.apps.thaibev.com//TemplateToms";
  //host = "http://localhost:61450";
  
  createRoom(room: string, user: any):  Observable<any> {
    var url = this.host + "/Room/CreateRoom";
    var userOnRoom = {
      UserId: user.userId,
      UserName: user.userName,
      Lat: 0,
      Lng: 0
    }

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('room', room);
    urlSearchParams.append('userJson', JSON.stringify(userOnRoom));
    let body = urlSearchParams.toString()
    return this.http.post(url, body, options)
        .map((res: Response) => {
              let json = res.json();
              if (json) return json;
            })
        .catch(this.handleError);
  }

  joinRoom (roomId: string, userName: string):  Observable<any> {
    var url = this.host + "/Room/JoinRoom";
    var userOnRoom = {
      UserName: userName,
      Lat: 0,
      Lng: 0
    }

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roomId', roomId);
    urlSearchParams.append('userJson', JSON.stringify(userOnRoom));
    let body = urlSearchParams.toString()
    return this.http.post(url, body, options)
        .map((res: Response) => {
              let json = res.json();
              if (json) return json;
            })
        .catch(this.handleError);
  }

  updateLocation(roomId: string, user: any): Observable<any> {
    var url = this.host + "/Room/UpdateUserByRoomId";
    var userOnRoom = {
      UserId: user.userId,
      UserName: user.userName,
      Lat: user.lat,
      Lng: user.lng
    }

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roomId', roomId);
    urlSearchParams.append('userJson', JSON.stringify(userOnRoom));
    let body = urlSearchParams.toString()
    return this.http.post(url, body, options)
        .map((res: Response) => {
              let json = res.json();
              if (json) return json;
            })
        .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json().description);
  }
}
