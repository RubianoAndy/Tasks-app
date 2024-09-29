import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent implements OnInit {
  totalTasks: any[] = [];

  ngOnInit(): void {
    this.totalTasks = localStorage.getItem('Tareas') ? JSON.parse(localStorage.getItem('Tareas')!) : [];
  }
}
