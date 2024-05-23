import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrl: './edit-toolbar.component.css'
})
export class EditToolbarComponent {
  newLink: string = ""

  addLink() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
  
      // Exit if the selection is not within a contentEditable element
      if (!this.isContentEditable(range.commonAncestorContainer)) {
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

      // Exit if the selection is not within a contentEditable element
      if (!this.isContentEditable(range.commonAncestorContainer)) {
        return;
      }

      const startNodeParent = range.startContainer.parentNode
      const endNodeParent = range.endContainer.parentNode
      if(startNodeParent?.nodeName === 'A'){
        const text = startNodeParent.textContent || ''
        const textNode = document.createTextNode(text);
        startNodeParent.parentElement?.replaceChild(textNode, startNodeParent)
      }
      if(endNodeParent?.nodeName === 'A'){
        const text = endNodeParent.textContent || ''
        const textNode = document.createTextNode(text);
        endNodeParent.parentElement?.replaceChild(textNode, endNodeParent)
      }

    }
  }


  isContentEditable(container: Node | null){
    let contentEditableElement: HTMLElement | null = null;
    while (container) {
      if (container.nodeType === Node.ELEMENT_NODE && (container as HTMLElement).hasAttribute('contentEditable')) {
        return(true)
      }
      container = container.parentNode;
    }
    return(false)
  }
  
}
