import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-standard-button',
  templateUrl: './standard-button.component.html',
  styleUrl: './standard-button.component.css'
})
export class StandardButtonComponent {
  @Input() label?: string | null

}
