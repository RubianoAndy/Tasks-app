import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  alertTime: number = 4;    // Tiempo en segundos
  message: string = '';
  type: string = '';
  title: string = '';
  showAlert: boolean = false;

  constructor (
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alert()
  }

  alert() {
    this.alertService.alertMessage$.subscribe(msg => {
      this.type = msg.type;
      this.message = msg.message;
      this.title = msg.title;
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 1000 * this.alertTime);
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
}
