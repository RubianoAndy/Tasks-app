import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent {

}
