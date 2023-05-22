import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateModel } from '@course-project/data-models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public login(authenticate: AuthenticateModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/auth/login',
      authenticate
    );
  }
}
