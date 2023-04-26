export class AnswerModel {
  id?: string;
  content: string;
  rating?: number;
  creationDate: Date;

  constructor(values: Partial<AnswerModel>) {
    this.id = values.id;
    this.content = values.content;
    this.rating = values.rating;
    this.creationDate = values.creationDate;
  }
}
