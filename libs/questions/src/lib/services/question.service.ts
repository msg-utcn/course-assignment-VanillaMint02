import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionsModel } from '../../../../models/questions.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  public getAllQuestions(): Observable<QuestionsModel> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    return this.httpClient.get(
      'http://localhost:3000/api/question-management',
      { headers }
    );
  }

  private getToken(): string {
    const token = localStorage.getItem('access_token');
    return token ? token : '';
  }
}
