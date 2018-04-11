import { Directive, HostListener, HostBinding  } from '@angular/core';

@Directive({
  selector: '[hideButton]'
})
export class HideButtonDirective {

  constructor() { }

  @HostBinding ('class.hide') private hide: boolean = false;
  
  @HostListener('click') onClick() {
    this.hide = true;
  }    

}
