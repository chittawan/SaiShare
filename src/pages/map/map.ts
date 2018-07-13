import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RoomProvider } from '../../providers/room/room';

declare var longdo;
declare var L;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * https://ionicframework.com/docs/native/geolocation/
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lmap: any;
  myRoom: any;
  myMarker: any;
  lat: number;
  lng: number;
  marks = [];
  users: any;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private geolocation: Geolocation
    , private roomProvider: RoomProvider) {

    this.myRoom = {
      roomId: this.navParams.get('roomId'),
      roomName: this.navParams.get('roomName'),
      userId: this.navParams.get('userId'),
      userName: this.navParams.get('userName')
    }
  }

  ionViewWillEnter() {
    if (!this.lmap) {
      var tiles = L.tileLayer('https://map.thaibev.com/map/msn-server/tile.php?zoom={z}&x={x}&y={y}&mode=icons&proj=epsg3857', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://longdomap.com">longdomap</a> contributors, Points &copy 2016 Thaibev'
      });
      var latlng = L.latLng(13.80800, 100.5500000);
      this.lmap = L.map('map', { center: latlng, zoom: 10, layers: [tiles], zoomControl: true });

      var user = {
        name: "test"
      }

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude

        // var latLng = this.myMarker.getLatLng();
        // this.lat = latLng.lat;
        // this.lng = latLng.lng;
        var latlng = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }

        var myUser = {
          userId: this.myRoom.userId,
          userName: this.myRoom.userName,
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }

        this.roomProvider.updateLocation(this.myRoom.roomId, myUser)
          .subscribe((res) => {
            if (res) {
              this.updateMaskByUsers(res);
            }
          })
        console.log(resp.coords.latitude + "," + resp.coords.longitude);

        var options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        };
        this.geolocation.watchPosition(options)
          .subscribe((data) => {
            try {
              this.lat = data.coords.latitude;
              this.lng = data.coords.longitude;

              if(data.coords.longitude > 0 && data.coords.longitude > 0){
                var myUser = {
                  userId: this.myRoom.userId,
                  userName: this.myRoom.userName,
                  lat: data.coords.latitude,
                  lng: data.coords.longitude
                }
                //this.updateMaskByUsers(myUser);

                this.roomProvider.updateLocation(this.myRoom.roomId, myUser)
                  .subscribe((res) => {
                    if (res) {
                      this.updateMaskByUsers(res);
                    }
                  })
              }

              console.log(data.coords.latitude + "," + data.coords.longitude);
            } catch (ex) {
              console.log(ex.message);
            }
          })


      }).catch((error) => {
        console.log('Error getting location', error);
      });


    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
  ionViewCanLeave() {
    document.getElementById("map").outerHTML = "";
  }

  updateMaskByUsers(users) {
    this.users = users;
    users.forEach(user => {
      var mark = this.marks[user.userId];
      if (user.lat > 0 && user.lng > 0) {
        if (!mark) {
          // create mark
          debugger;
        var mapIcon =L.icon({
            iconUrl: 'assets/js/images/marker-icon.png',
            shadowUrl: '',//images/map/markers_shadow.png
            iconSize: [25, 25], // size of the icon
            shadowSize: [35, 35], // size of the shadow
            iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 25],  // the same for the shadow
            popupAnchor: [2, -40] // point from which the popup should open relative to the iconAnchor
        });
                      
          var myMarker = L.marker([user.lat, user.lng], { icon: mapIcon }).bindPopup(user.userName);
          myMarker.addTo(this.lmap);
          this.marks[user.userId] = myMarker;
        } else {
          // update mark
          var newLatLng = new L.LatLng(user.lat, user.lng);
          mark.setLatLng(newLatLng);
        }
      }
    });
  }

  selectItem() {
    var myUser = {
      userId: this.myRoom.userId,
      userName: this.myRoom.userName,
      lat: 0,
      lng: 0
    }
    this.roomProvider.updateLocation(this.myRoom.roomId, myUser)
      .subscribe((res) => {
        if (res) {
          this.updateMaskByUsers(res);
        }
      })
  }
}
