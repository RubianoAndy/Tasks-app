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
  id!: number;
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
      this.id = +params['id'];
    })

    this.createForm();
  }

  createForm(data: any = null) {
    data = data || {
      task: '',
      status: 'Pendiente',
    }

    this.form = this.formBuilder.group({
      task: [data.task, [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ]],
      status: [data.status, [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ]],
    });
  }

  onSubmit() {
    var id = null;
    let totalTasks: any[] = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];

    var alertBody = null;

    if(totalTasks.length > 0) {
      id = totalTasks.length + 1;

      var newTask = {
        id:  id,
        task: this.form.value.task,
        status: this.form.value.status,
        responsible: this.form.value.responsible || [],
      };

      totalTasks.push(newTask);

      alertBody = {
        type: 'okay',
        title: '¡Felicitaciones!',
        message: 'Registro guardado exitosamente',
      }

      this.alertService.showAlert(alertBody);

      localStorage.setItem('Tareas', JSON.stringify(totalTasks));

      this.router.navigate(['/']);
    }

    alertBody = {
      type: 'error',
      title: 'Error',
      message: 'No se pudo guardar el registro',
    }

    this.alertService.showAlert(alertBody);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
