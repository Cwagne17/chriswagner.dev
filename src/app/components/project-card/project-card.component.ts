import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project-card',
  imports: [
    FontAwesomeModule,
  ],
  templateUrl: './project-card.component.html',
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  faGithub = faGithub;

}
