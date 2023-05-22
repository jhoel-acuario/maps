import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, clearStorage } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}
interface PlainMarker {
  color: string;
  lngLat: number[];
}
@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent {
  @ViewChild('map') divmap?: ElementRef;
  public zoom: number = 13;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5, 40);
  public markers: MarkerColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divmap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divmap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
    });
    /* const marker = new Marker({
      color:'red'
    }).setLngLat(this.lngLat).addTo(this.map); */
  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({ color, marker });
    this.saveLocalStorage();

    marker.on('dragend', ()=>{
      this.saveLocalStorage();
    })
  }
  deleteMarker(index: number) {
    this.markers[index].marker.remove(), this.markers.splice(index, 1);
  }
  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveLocalStorage() {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });
    localStorage.setItem('plainMarker', JSON.stringify(plainMarker));
  }
  reloadLocalStorage() {
    const plainMarkerString = localStorage.getItem('plainMarker') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkerString);
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;

      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
