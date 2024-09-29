import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/tasks/tasks.component') },
    { path: 'nueva-tarea/:idTask', loadComponent: () => import('./components/tasks/new-task/new-task.component') },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
