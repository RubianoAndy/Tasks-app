import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }

  getTasks(status: string = '') {
    var totalTasks = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
    if (status != '' && status != null && status != undefined)
      totalTasks = totalTasks.filter((task: any) => task.status === status);

    return totalTasks;
  }
}
