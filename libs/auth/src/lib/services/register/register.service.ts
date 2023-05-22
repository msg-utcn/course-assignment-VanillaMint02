import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '@course-project/data-models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  public register(register: RegisterModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/auth/register',
      register
    );
  }
}
