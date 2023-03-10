import { Injectable } from '@angular/core';
import { Enrollment } from './../models/enrollment.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerEnrollmentService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.url_api}/inscripciones`).pipe(
      catchError(this.handleError)
    );
  }
  getEnrollment(id: string) {
    return this.http.get<Enrollment[]>(`${environment.url_api}/inscripcion/${id}/`).pipe(
      catchError(this.handleError)
    );
  }
  createEnrollment(enrollment: Enrollment) {
    return this.http.post(`${environment.url_api}/inscripciones/`, enrollment).pipe(
      catchError(this.handleError)
    );
  }
  updateEnrollment(id: string, changes: Partial<Enrollment>) {
    return this.http.put(`${environment.url_api}/inscripcion/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  deleteEnrollment(id: String) {
    return this.http.delete(`${environment.url_api}/inscripcion/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Ups Algo Salio Mal en la solicitud HTTP'));
  }
}
