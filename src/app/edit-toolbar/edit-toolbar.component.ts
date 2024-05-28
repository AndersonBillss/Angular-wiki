import { LinkComponent } from './tools/link/link.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrl: './edit-toolbar.component.css'
})
export class EditToolbarComponent {
  selectedToolIndex = 0;

  tools = [
    "Link",
    "Element"
  ]

  selectTool(index: number){
    this.selectedToolIndex = index
  }

}
