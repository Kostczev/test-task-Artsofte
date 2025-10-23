import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "../navigation-component/navigation-component"; 

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss'
})
export class LayoutComponent {

}
