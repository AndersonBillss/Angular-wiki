import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit {

  pageContents: any[] = []
  title: string = ""


  editMode: boolean = false
  highlightedType: string = "none"

  constructor( 
    private pageContentService: PageContentsService,
    private route: ActivatedRoute
  ){

  }

  toggleEditMode(){
    this.editMode=!this.editMode
  }


  ngOnInit(): void {
		this.title = this.route.snapshot.params["title"];
    this.pageContentService.getPageContents(this.title).subscribe((data) => {
      console.log(data)
      this.pageContents = data
    })

  }

  test(){
    console.log(this.pageContents)
  }


}
