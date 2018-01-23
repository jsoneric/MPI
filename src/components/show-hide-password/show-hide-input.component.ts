import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[pbmShowHideInput]'
})
export class ShowHideInputDirective
{
  @HostBinding() type: string;

  constructor(public el: ElementRef){
    this.type = 'password';
  }

  changeType(type:string) {
    this.type = type;
    this.el.nativeElement.children[0].type = this.type;
  }
}
