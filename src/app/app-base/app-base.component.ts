import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    } else if(this.collapsed){
      styleClass = 'body-trimmed';
    }
    return styleClass;
  }

}
