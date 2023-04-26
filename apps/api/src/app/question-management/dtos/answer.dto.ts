export class AnswerDto {
  id?: string;
  content: string;
  rating?: number;
  creationDate: Date;

  constructor(values: Partial<AnswerDto>) {
    if (values) {
      this.id = values.id;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}
