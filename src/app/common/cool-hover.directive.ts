import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cool-hover]'
})
export class CoolHoverDirective {
  wrapperDiv = new HTMLDivElement();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    this.wrapperDiv.classList.add('cool-hover-wrapper');
  }

  @Input('cool-hover') set render(particleNum: number) {
    this.viewContainer.clear();

    for(let i = 0; i < particleNum; i++) {
    }
  }
}
