import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
    selector: 'app-alone-page',
    standalone: true,
    templateUrl: './alone-page.component.html',
    styleUrls: ['./alone-page.component.css'],
    imports: [CommonModule, CounterAloneComponent, SideMenuComponent]
})
export class AlonePageComponent {

}
