import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'course-project-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  constructor(private questionService: QuestionService) {}
  getAllQuestions(): void {
    this.questionService
      .getAllQuestions()
      .subscribe((questions) => console.log(questions));
  }
}
