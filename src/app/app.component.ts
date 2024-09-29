import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tasks-app';

  defaultTasks = [
    {
      id: 1,
      task: 'Reforzar conocimientos de git',
      status: 'Pendiente',
      responsible: [
        {
          name: 'Lus Robles',
          age: '18',
          skills: ['Frontend', 'Backend'],
        },
      ],
    },
    {
      id: 2,
      task: 'Reforzar conocimientos de git',
      status: 'Completada',
      responsible: [
        {
          name: 'Andrea López',
          age: '25',
          skills: ['Power BI'],
        },
        {
          name: 'Camilo Villegas',
          age: '31',
          skills: ['Angular'],
        },
      ],
    },
  ];

  constructor () {
    localStorage.setItem('Tareas', JSON.stringify(this.defaultTasks));
  }
}
