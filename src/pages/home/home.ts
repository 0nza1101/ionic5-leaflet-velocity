import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import 'leaflet';
import 'leaflet-velocity';

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
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
          'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(this.map);

    this.map.setView([-22, 150], 4);

    //Read JSON DATA and use it for velocity layer
    this.http.get('assets/wind-gbr.json').map(res => res.json()).subscribe(data => {
      var vLayer = L.velocityLayer({
        displayValues: true,
    		displayOptions: {
    			velocityType: 'GBR Wind',
    			displayPosition: 'bottomleft',
    			displayEmptyString: 'No wind data'
    		},
    		data: data,
    		maxVelocity: 10
      });
      this.map.addLayer(vLayer, 'Wind - Great Barrier Reef');
    });
  }

}
