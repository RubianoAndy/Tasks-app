import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../global/services/alert/alert.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgFor,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export default class NewTaskComponent implements OnInit {
  idTask!: number;
  form!: FormGroup;

  statusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Completada', value: 'Completada' },
  ]

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTask = +params['idTask'];
    })

    this.createForm();
  }

  createForm(data: any = null) {
    data = data || {
      task: '',
      status: '',
    }

    this.form = this.formBuilder.group({
      task: [data.task, [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ]],
      status: [data.status, [ Validators.required, Validators.minLength(2) ]],
    });
  }

  onSubmit() {
    var id = 0;
    let totalTasks: any[] = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];

    var alertBody = null;

    if (totalTasks.length >= 0) {
      let id = totalTasks.length + 1;

      const newTask = {
        id: id,
        task: this.form.value.task,
        status: this.form.value.status,
        responsible: this.form.value.responsible || [],
      };

      totalTasks.push(newTask);

      localStorage.setItem('Tareas', JSON.stringify(totalTasks));
      
      alertBody = {
        type: 'okay',
        title: '¡Felicitaciones!',
        message: 'Registro guardado exitosamente',
      }

      this.alertService.showAlert(alertBody);

      this.router.navigate(['/']);
    } else {

      alertBody = {
        type: 'error',
        title: 'Error',
        message: 'No se pudo guardar el registro',
      }

      this.alertService.showAlert(alertBody);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
