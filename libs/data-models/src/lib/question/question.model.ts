export enum QuestionTopic {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
}

export interface QuestionModel {
  id?: string;
  title?: string;
  postedBy?: string;
  content?: string;
  topic?: QuestionTopic;
  rating?: number;
  creationDate?: string;
}
