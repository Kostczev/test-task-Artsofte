import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navigation-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.scss'
})
export class NavigationComponent {
  menuItems = [
    {
      lable: 'Список команий',
      link: 'list'
    },
    {
      lable: 'Показать на карте',
      link: 'map'
    }
  ]
}
