This is a sample application using Ionic 3 and Leaflet with leaflet-velocity.
Since it was a headache to implement leaflet-velocity with Ionic 3, I decided to make a new version of this plugin.
This npm package [leaflet-velocity-ts](https://www.npmjs.com/package/leaflet-velocity-ts) is based on a typescript fork of leaflet-velocity made by [Cyrille Meichel](https://github.com/landru29/leaflet-velocity-ts) adding to it wind speed values on the map when the mouse is over a region and some other little fix.
`npm i leaflet-velocity-ts --save`

```typescript
import 'leaflet';
import 'leaflet-velocity-ts';

declare var L: any;//Declare leaflet lib and plugin
```

 ## Get it running
 * Clone this repository: `https://github.com/0nza1101/ionic3-leaflet-velocity.git`.
 * Run `npm install` from the project root.
 * If you do not install the ionic CLI (`npm install cordova ionic -g`)
 * Run `ionic serve` in a terminal from the project root.

 ## How to use it
 ```typescript
 //Read JSON DATA and use it for velocity layer
 this.http.get('assets/wind-gbr.json').map(res => res.json()).subscribe(data => {
   let velocity = L.velocityLayer({
     displayValues: true,
     displayOptions: {
       velocityType: 'GBR Wind',
       position: 'bottomleft',//REQUIRED !
       emptyString: 'No velocity data', //REQUIRED !
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
```
