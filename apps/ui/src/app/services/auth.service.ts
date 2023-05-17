import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticateModel } from '../data-models/authenticate.model';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterModel } from '../data-models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(authenticate: AuthenticateModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/auth/login',
      authenticate
    );
  }

  register(register: RegisterModel): Observable<any> {
    return this.httpClient
      .post('http://localhost:3000/api/auth/register', register)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.log(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(error);
  }
}
