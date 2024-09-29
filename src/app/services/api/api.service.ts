import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  getApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/todos').pipe(
      // El tap se ejecuta depués de realizada la petición
      tap(response => {
        localStorage.setItem('api', JSON.stringify(response));
      })
    );
  }

  getApiById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/todos' + id);
  }
}
