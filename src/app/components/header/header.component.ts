import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBars = faBars;

  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  constructor() {
    this.onResize(); // call this to get the initial window size
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  isMobile(): boolean {
    return this.screenWidth <= 768;
  }

  get title(): string {
    return this.isMobile() ? "Chris W." : "Chris Wagner";
  }
}
