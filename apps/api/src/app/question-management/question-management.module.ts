import { Module } from '@nestjs/common';
import { QuestionManagementController } from './question-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';
import { AnswerModel } from './model/answer.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionModel]),
    TypeOrmModule.forFeature([AnswerModel]),
  ],
  controllers: [QuestionManagementController],
  providers: [QuestionService, AnswerService],
  exports: [QuestionService, TypeOrmModule, AnswerService],
})
export class QuestionManagementModule {}
