import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomJoinPage } from './room-join';

@NgModule({
  declarations: [
    RoomJoinPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomJoinPage),
  ],
})
export class RoomJoinPageModule {}
