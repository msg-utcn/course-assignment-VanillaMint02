import { Module } from '@nestjs/common';
import { QuestionManagementController } from './question-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';
import { AnswerModel } from './model/answer.model';
import {UserModule} from "../user/user.module";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../auth/roles.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionModel,AnswerModel]),
    UserModule,
  ],
  controllers: [QuestionManagementController],
  providers: [QuestionService, AnswerService],
  exports: [QuestionService, TypeOrmModule, AnswerService],
})
export class QuestionManagementModule {}
