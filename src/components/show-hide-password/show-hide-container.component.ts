import { Component, ContentChild, HostBinding } from '@angular/core';
import { ShowHideInputDirective } from './show-hide-input.component'

@Component({
  selector: 'pbm-show-hide-container',
  templateUrl: 'show-hide-password.component.html'
})
export class ShowHideContainerComponent
{
  show = false;

  @HostBinding('class') classes = 'show-hide-password';
  @ContentChild(ShowHideInputDirective) input: ShowHideInputDirective;

  constructor(){}

  toggleShow()
  {
    this.show = !this.show;
    if (this.show){
      this.input.changeType("text");
    }
    else {
      this.input.changeType("password");
    }
  }
}
