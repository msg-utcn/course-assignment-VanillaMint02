export enum Topic {
  JavaScript = 'JavaScript',
  TypeScript = 'Typescript',
}
export interface QuestionsModel {
  id?: string;
  title?: string;
  postedBy?: string;
  content?: string;
  topic?: string;
  rating?: number;
  creationDate?: string;
}
