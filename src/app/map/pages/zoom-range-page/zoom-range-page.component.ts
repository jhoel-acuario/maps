import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, clearStorage } from "mapbox-gl";

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
 styleUrls:['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit , OnDestroy{
  
  @ViewChild('map') divmap?: ElementRef;
  public zoom: number=10;
  public map? : Map;
  public lngLat: LngLat = new LngLat(-74.5,40)
  
  ngAfterViewInit(): void {
   if(!this.divmap) throw ('El elemento HTML no fue encontrado')
   this.map= new Map({
    container: this.divmap.nativeElement,
    style:'mapbox://styles/mapbox/streets-v12',
    center:this.lngLat,
    zoom:this.zoom,
   });
   this.mapListener()
  }

  mapListener(){
    if(!this.map) throw 'Mapa no inicializada';
    this.map.on('zoom', (ev)=>{
      this.zoom= this.map!.getZoom()
    });
    this.map.on('zoomend', (env)=>{
      if(this.map!.getZoom()< 18) return;
      this.map!.zoomTo(18)
     // this.zoom= this.map!.getZoom()
    }),
    this.map.on('move', ()=>{
        this.lngLat= this.map!.getCenter();
        const {lng, lat}= this.lngLat
        //console.log(this.lngLat)
    })
  }
  zoomIn(){
    this.map?.zoomIn
  }
  zoomOut(){
this.map?.zoomOut
  }
  zoomChanged(value: string){
    this.zoom= Number(value);
    this.map?.zoomTo(this.zoom)
  }

  ngOnDestroy(): void {
    this.map?.remove()
   // this.map?.off('move', ()=>{})
  }
}


