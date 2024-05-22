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

  newLink: string = ""
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


  
  addLink() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
  
      // Find the contentEditable element containing the selection
      let contentEditableElement: HTMLElement | null = null;
      let container: Node | null = range.commonAncestorContainer;
      while (container) {
        if (container.nodeType === Node.ELEMENT_NODE && (container as HTMLElement).hasAttribute('contentEditable')) {
          contentEditableElement = container as HTMLElement;
          break;
        }
        container = container.parentNode;
      }
  
      // Exit if the selection is not within a contentEditable element
      if (!contentEditableElement) {
        return;
      }
      // Trim leading spaces by adjusting the start offset
      while (range.startOffset < range.endOffset && range.toString()[0] === ' ') {
        range.setStart(range.startContainer, range.startOffset + 1);
      }
      // Trim trailing spaces by adjusting the end offset
      while (range.endOffset > range.startOffset && range.toString().slice(-1) === ' ') {
        range.setEnd(range.endContainer, range.endOffset - 1);
      }
  
      const selectedText = range.toString();
      if(selectedText === ''){
        return //Exit if there is no selected text
      }
      
      const linkElement = document.createElement('a');
      linkElement.href = `/page/${this.newLink}`; 
      linkElement.textContent = selectedText;
  
      range.deleteContents();
      range.insertNode(linkElement);
    }
  }

  removeLink(){
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);

      while (range.startOffset > 0 && range.startContainer.textContent![range.startOffset - 1].trim() === '') {
        range.setStart(range.startContainer, range.startOffset - 1);
      }
  
      while (range.endOffset < range.endContainer.textContent!.length && range.endContainer.textContent![range.endOffset].trim() === '') {
        range.setEnd(range.endContainer, range.endOffset + 1);
      }
      for(const letter of range.toString()){
        console.log(letter)
      }
  
      // Find the contentEditable element containing the selection
      let contentEditableElement: HTMLElement | null = null;
      let container: Node | null = range.commonAncestorContainer;
      while (container) {
        if (container.nodeType === Node.ELEMENT_NODE && (container as HTMLElement).hasAttribute('contentEditable')) {
          contentEditableElement = container as HTMLElement;
          break;
        }
        container = container.parentNode;
      }
  
      // Exit if the selection is not within a contentEditable element
      if (!contentEditableElement) {
        return;
      }
      const selectedText = range.toString();
      if(selectedText === ''){
        return //Exit if there is no selected text
      }
      
      const textNode = document.createTextNode(selectedText);

      range.deleteContents();
      range.insertNode(textNode);
    }
  }

  ngOnInit(): void {
		this.title = this.route.snapshot.params["title"];
    console.log(this.title)
    this.pageContentService.getPageContents(this.title).subscribe((data) => {
      console.log(data)
      this.pageContents = data
    })

    window.addEventListener('mouseup', this.highlightHandler);
    window.addEventListener('mousedown', this.highlightHandler);
  }

  test(){
    console.log(this.pageContents)
  }

  highlightHandler() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if(range.toString() === ''){
        this.highlightedType = 'none'
      } else {
        const nodes = range.cloneContents().querySelectorAll('a');

        if (nodes.length > 0) {
          this.highlightedType = 'anchor'
        } else {
          this.highlightedType = 'regular'
        }
      }
    }
  }

  ngOnDestroy() {
    window.removeEventListener('mouseup', this.highlightHandler);
    window.addEventListener('mousedown', this.highlightHandler);
  }

}
