import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/tasks/tasks.component') },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
