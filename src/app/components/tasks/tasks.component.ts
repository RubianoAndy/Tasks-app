import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../global/services/alert/alert.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgFor,
    NgIf,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent implements OnInit {
  form!: FormGroup;
  totalTasks: any[] = [];
  selectedStatus: any;

  statusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Completada', value: 'Completada' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.totalTasks = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
    if (this.selectedStatus != '' && this.selectedStatus != null && this.selectedStatus != undefined)
      this.totalTasks = this.totalTasks.filter((task: any) => task.status === this.selectedStatus);

    this.totalTasks.sort((a: any, b: any) => a.id - b.id);    // Ordenar de menor a mayor
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
}
