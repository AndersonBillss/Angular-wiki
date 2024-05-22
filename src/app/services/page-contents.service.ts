import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageContentsService {

  constructor() { }

  getPageContents(title: string){
    let pageContentsResult
    if(title === "test"){
      pageContentsResult = of(
        [
          {
            type: "Header",
            text: "test",
          },
          {
            type: "Paragraph",
            text: "test paragraph for my website",
          },
        ]
      )
    } else {
      pageContentsResult = of(
        [
          {
            type: "Header",
            text: "page not found"
          }
        ]
      )
    }


    return pageContentsResult
  }

}
