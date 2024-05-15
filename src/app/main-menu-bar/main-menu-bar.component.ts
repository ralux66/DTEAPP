import { Component } from '@angular/core';
 
 
@Component({
  selector: 'app-main-menu-bar',
  templateUrl: './main-menu-bar.component.html',
  styleUrls: ['./main-menu-bar.component.css'],
  //standalone: true,
  //imports: [MaterialModule],
})
export class MainMenuBarComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
