import { Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = ''
  navOptions: string[] = [
    'first option',
    'second option',
    'third option',
    'fourth option',
    'fifth option',
  ]

}
