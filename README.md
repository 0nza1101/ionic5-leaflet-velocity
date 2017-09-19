This is a sample application using Ionic 3 and Leaflet with leaflet-velocity.
Since it was a headache to implement leaflet-velocity with Ionic 3, I decided to share it.
* You need leaflet (v1.0.3 or v0.7.7).
* jQuery script tag inside `index.html`.
* And this :
```
import 'leaflet';
import 'leaflet-velocity';

declare var L: any;//Declare leaflet lib and plugin
```

 ## Get it running
 * Clone this repository: `https://github.com/0nza1101/leaflet-velocity-ionic.git`.
 * Run `npm install` from the project root.
 * If you do not install the ionic CLI (`npm install cordova ionic -g`)
 * Run `ionic serve` in a terminal from the project root.

 ## How to use it
 ```
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
```
