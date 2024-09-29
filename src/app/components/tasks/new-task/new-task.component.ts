import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  task: any;

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
    });

    if (this.idTask > 0) {
      const edit = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
      const taskToEdit = edit.find((task: any) => task.id === this.idTask);

      if (taskToEdit) {
        this.task = {
          task: taskToEdit.task,
          status: taskToEdit.status,
          responsibles: taskToEdit.responsibles || [],
        };

        this.createForm(this.task);

        if (this.task.responsibles) {
          for (let i = 0; i < this.task.responsibles.length; i++) {
            var responsible = this.task.responsibles[i];

            const responsiblesGroup = this.formBuilder.group({
              name: [responsible.name, [Validators.required, Validators.minLength(2)]],
              age: [responsible.age, [Validators.required, Validators.min(18)]],
              skills: this.formBuilder.array([]),
            });

            if (responsible.skills) {
              for (let j = 0; j < responsible.skills.length; j++) {
                var skill = responsible.skills[j];
                const skillsGroup = this.formBuilder.group({
                  skill: [skill.skill, [Validators.required, Validators.minLength(2)]]
                });

                ( responsiblesGroup.get('skills') as FormArray ).push(skillsGroup);
              }
            }

            this.responsibles.push(responsiblesGroup);
          }
        }
      } else
        this.createForm();
    } else 
      this.createForm();
  }

  createForm(data: any = null) {
    data = data || {
      task: '',
      status: '',
      responsibles: [],
    }

    this.form = this.formBuilder.group({
      task: [data.task, [ Validators.required, Validators.minLength(5), Validators.maxLength(150) ]],
      status: [data.status, [ Validators.required, Validators.minLength(1) ]],
      responsibles: this.formBuilder.array([]),
    });
  }

  get responsibles(): FormArray {
    return this.form.get('responsibles') as FormArray;
  }

  addResponsible() {
    const responsiblesGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.formBuilder.array([]),
    });
    
    this.responsibles.push(responsiblesGroup);
  }

  removeResponsible(index: number) {
    this.responsibles.removeAt(index);
  }

  skills(responsibleIndex: number): FormArray {
    return this.responsibles.at(responsibleIndex).get('skills') as FormArray;
  }

  addSkill(responsibleIndex: number) {
    const skills = this.skills(responsibleIndex);
  
    const skillsGroup = this.formBuilder.group({
      skill: ['', [Validators.required, Validators.minLength(2)]]
    });
  
    skills.push(skillsGroup);
  }

  removeSkill(responsibleIndex: number, skillIndex: number) {
    const skills = this.skills(responsibleIndex);

    skills.removeAt(skillIndex);
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
        responsibles: this.form.value.responsibles || [],
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

  skillsValidation(): boolean {
    return this.form.value.responsibles.every((responsible: any) => {
      return responsible.skills && responsible.skills.length > 0;
    });
  }
}
