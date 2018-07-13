import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';
import { RoomCreatePage } from '../room-create/room-create';
import { RoomJoinPage } from '../room-join/room-join';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  create(){
    this.navCtrl.push(RoomCreatePage);
  }

  join(){
    this.navCtrl.push(RoomJoinPage);
  }
}
