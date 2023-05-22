import { Component } from '@angular/core';
import { House, houses } from '../../interfaces/houses.interfa';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls:['./properties-page.component.css']
})
export class PropertiesPageComponent {
  public houses: House[]= houses
}
