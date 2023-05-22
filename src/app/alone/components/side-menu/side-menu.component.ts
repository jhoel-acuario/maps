import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuItem{
  route: string,
  name:string,
}

@Component({
  standalone:true,
  imports:[CommonModule, RouterModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls:['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItem: MenuItem[]=[
    {route:'/maps/fullscreen', name:'Full Screen'},
    {route:'/maps/zoom-range', name:'Zoom Range'},
    {route:'/maps/markers', name:'Markers'},
    {route:'/maps/properties', name:'Houses'},
    {route:'/alone', name:'Alone Page'},


  ];

}
