import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../global/services/alert/alert.service';
import { TaskService } from '../../services/task/task.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgFor,
    NgIf,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent implements OnInit {
  totalTasks: any[] = [];
  selectedStatus: any;

  statusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Completada', value: 'Completada' },
  ]

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,

    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.totalTasks = this.taskService.getTasks('');
    if (this.selectedStatus != '' && this.selectedStatus != null && this.selectedStatus != undefined)
      this.totalTasks = this.taskService.getTasks(this.selectedStatus);

    this.totalTasks.sort((a: any, b: any) => a.id - b.id);    // Ordenar de menor a mayor

    this.getApiInfo();
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

  change(event: Event) {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.ngOnInit();
  }

  getApiInfo() {
    this.apiService.getApi().subscribe(
      () => {
        console.log(`Si se obtuvo la información del api`)
      },
      (error) => {
        console.error('No se obtuvo la información del api:', error);
      }
    );
  }
}
