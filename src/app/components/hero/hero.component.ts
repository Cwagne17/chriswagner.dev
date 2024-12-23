import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [
    FontAwesomeModule,
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  faChevronDown = faChevronDown;

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
}
