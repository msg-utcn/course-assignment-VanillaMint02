import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {QuestionModel} from './question.model';
import {UserModel} from "../../user/models/user.model";

@Entity()
export class AnswerModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({nullable: false})
  content: string;
  @Column({nullable: false})
  rating?: number;
  @Column({nullable: false})
  creationDate: Date;

  @ManyToOne(() => QuestionModel, (question) => question.answers, {
    nullable: false,
    cascade: true,
  })
  parent: QuestionModel;
  @ManyToOne(() => UserModel, (user) => user.answers, {
    nullable: false,
    cascade: true,
  })
  postingUser: UserModel;

  constructor(values: Partial<AnswerModel>) {
    if (values) {
      this.id = values.id;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
      this.parent = values.parent;
      this.postingUser = values.postingUser;
    }
  }
}
