import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from "mapbox-gl";

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls:['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?:[number, number];
  
 @ViewChild('map') divmap?: ElementRef



  ngAfterViewInit():void{
    if(!this.divmap?.nativeElement) throw "Map Div not found";
    if(!this.lngLat) throw ' LngLat can t be null'
    const map = new Map({
      container: this.divmap.nativeElement,
      style:'mapbox://styles/mapbox/streets-v12',
      center:this.lngLat,
      zoom:15,
      interactive:false
     });

     new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)

  }
}
