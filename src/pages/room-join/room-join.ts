import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';

import { RoomProvider } from '../../providers/room/room';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RoomJoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-join',
  templateUrl: 'room-join.html',
})
export class RoomJoinPage {

  user : any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public roomProvider: RoomProvider,
    public userProvider: UserProvider) {
  }

  ionViewWillEnter() {
    this.userProvider.getUser().then((res) => {
      this.user = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomJoinPage');
  }

  join(myFrom) {
    if (myFrom.roomId && myFrom.userName) {
      this.roomProvider.joinRoom(myFrom.roomId, myFrom.userName)
        .subscribe((res) => {
          if (res) {
            debugger;
            this.navCtrl.push(MapPage, {
              roomId : res.roomId,
              roomName : res.roomName,
              userId : res.userOnRoom[0].userId,
              userName : res.userOnRoom[0].userName
            });
          }
        })

    }
  }
}
