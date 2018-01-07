import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import 'leaflet';
import 'leaflet-velocity-ts';

declare var L: any;//Declare leaflet lib and plugin

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  center: any;

  constructor(public navCtrl: NavController, public http: Http) {

  }

  ionViewDidLoad() {
    console.log(L);//See if leaflet lib succesfully loaded
    console.log('ionViewDidLoad MapPage');

    //set map center
    this.center = [48.775556, 9.182778]; //Stuttgart

    //setup leaflet map
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    //Add tile layer
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(this.map);

    this.map.setView([-22, 150], 4);

    //Read JSON DATA and use it for velocity layer
    this.http.get('assets/wind-gbr.json').map(res => res.json()).subscribe(data => {
      let velocity = L.velocityLayer({
        displayValues: true,
        displayOptions: {
          velocityType: 'GBR Wind',
          position: 'bottomleft',
          emptyString: 'No velocity data',
          angleConvention: 'bearingCW',
          displayPosition: 'bottomleft',
          displayEmptyString: 'No velocity data',
          speedUnit: 'm/s'
        },
        data: data,
        maxVelocity: 10,
      });
      velocity.addTo(this.map);
    });
  }

}
