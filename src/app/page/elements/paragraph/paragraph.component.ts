import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { encodePageContent, parsePageContent } from '../../../functions/pageContentFunctions';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit{
  @Input() editMode!: boolean;
  @Input() data!: string;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

  }

  test(){

  }

  cacheChanges(event: any) {
    const newValue = event.target.innerHTML;

    this.dataChange.emit(newValue);
  }
}