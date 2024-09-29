import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
      task: [data.task, [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      status: [data.status, [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
    });
  }

  onSubmit() {

  }
}
