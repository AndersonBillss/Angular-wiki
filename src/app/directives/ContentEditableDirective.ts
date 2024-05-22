import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[contentEditable]'
})
export class ContentEditableDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    this.emitChange();
  }

  emitChange() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true
    });
    this.el.nativeElement.dispatchEvent(event);
  }
}