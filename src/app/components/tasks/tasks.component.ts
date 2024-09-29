import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../global/services/alert/alert.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent implements OnInit {
  totalTasks: any[] = [];

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.totalTasks = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
  }

  deleteTask(id: number) {
    var tasks = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
    tasks = tasks.filter((task: any) => task.id !== id);
    localStorage.setItem('Tareas', JSON.stringify(tasks));

    var alertBody = null;

    alertBody = {
      type: 'okay',
      title: '¡Felicitaciones!',
      message: `La tarea ${id} se ha borrado exitosamente`,
    };

    this.alertService.showAlert(alertBody);

    this.ngOnInit();
  }
}
