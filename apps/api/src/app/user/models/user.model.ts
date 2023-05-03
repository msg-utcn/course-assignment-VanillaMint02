import {UserRole} from './user-roles';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {QuestionModel} from "../../question-management/model/question.model";
import {AnswerModel} from "../../question-management/model/answer.model";

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({nullable: false})
  name: string;
  @Column({nullable: false})
  email: string;
  @Column({nullable: false, enum: UserRole, type: 'enum', default: 'USER'})
  roles: UserRole[];
  @Column({nullable: false})
  password: string;
  @OneToMany(() => QuestionModel, (question) => question.user)
  questions?: QuestionModel[];
  @OneToMany(() => AnswerModel, (answer) => answer.postingUser)
  answers?: AnswerModel[];

  constructor(values: Partial<UserModel>) {
    if (values) {
      this.id = values.id;
      this.email = values.email;
      this.name = values.name;
      this.password = values.password;
      this.questions = values.questions;
    }
  }
}
