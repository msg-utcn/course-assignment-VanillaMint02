import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionDto } from './dtos/question.dto';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionManagementConfig } from './question-management.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dtos/answer.dto';
import { AnswerConfig } from './answer.config';
import { UpdateAnswerDto } from './dtos/update-answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(QuestionManagementConfig.SWAGGER_FEATURE)
@Controller(QuestionManagementConfig.API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionService.readAll();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.readById(id);
  }

  @Post()
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.create(dto);
  }

  @Post(AnswerConfig.API_ROUTE)
  async createAnswer(@Body() dto: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.create(dto);
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto
  ): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.delete(id);
  }

  @Get()
  async getAllAnswers() {
    return this.answerService.readAll();
  }

  @Delete(AnswerConfig.API_ROUTE + '/:id')
  async deleteAnswer(@Param('id') id: string): Promise<void> {
    return this.answerService.delete(id);
  }

  @Patch(AnswerConfig.API_ROUTE + '/id:')
  async editAnswer(
    @Param('id') id: string,
    @Body() dto: UpdateAnswerDto
  ): Promise<AnswerDto> {
    return this.answerService.update(id, dto);
  }
}
