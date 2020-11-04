import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import 'leaflet';
import 'leaflet-velocity-ts';

declare var L: any; // Declare leaflet lib and plugin

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  center: any;

  constructor(public http: HttpClient) {}

  ionViewDidEnter() {
    console.log(L); // See if leaflet lib succesfully loaded

    // Set map center
    this.center = [48.775556, 9.182778]; // Stuttgart

    // Setup leaflet map
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    // Add tile layer
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}).addTo(this.map);

    this.map.setView([-22, 150], 4);

    // Read JSON DATA and use it for velocity layer
    this.http.get('assets/wind-gbr.json').subscribe(data => {
      console.log('velocity data', data);
      const velocity = L.velocityLayer({
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
        data,
        maxVelocity: 10,
      });
      velocity.addTo(this.map);
    });
  }

}
