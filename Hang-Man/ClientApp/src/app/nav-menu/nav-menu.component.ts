import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }

    InfoModal() {
        document.getElementById(`infoHeader`).textContent = 'Hoe om te speel';
        document.getElementById(`infotext`).style.display = 'inline';
        document.getElementById(`erkenningtext`).style.display = 'none';
        document.getElementById(`settingstext`).style.display = 'none';
    }
}
