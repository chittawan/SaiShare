import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';

import { RoomProvider } from '../../providers/room/room';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the RoomCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public roomProvider: RoomProvider
    , public userProvider: UserProvider) {
  }
  user: any = {
    userId: 0,
    userName: ''
  };
  ionViewWillEnter() {
    this.userProvider.getUser().then((res) => {
      if (res) {
        this.user = res;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePage');
  }

  create(myFrom) {
    if (myFrom.roomName && myFrom.userName) {
      //var myroom = this.roomProvider.create(myFrom.roomName, myFrom.password);

      this.user.userName = myFrom.userName;

      this.roomProvider.createRoom(myFrom.roomName, this.user)
        .subscribe((res) => {
          if (res) {
            this.userProvider.setUser(res.userOnRoom[0].userId, res.userOnRoom[0].userName);
            this.navCtrl.push(MapPage, {
              roomId: res.roomId,
              roomName: res.roomName,
              userId: res.userOnRoom[0].userId,
              userName: res.userOnRoom[0].userName
            });

          }
        },
          (error) => {
            debugger;
          });

    }
  }
}
