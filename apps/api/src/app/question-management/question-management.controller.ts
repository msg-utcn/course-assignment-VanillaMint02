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
import { ApiTags } from '@nestjs/swagger';
import { QuestionManagementConfig } from './question-management.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@ApiTags(QuestionManagementConfig.SWAGGER_FEATURE)
@Controller(QuestionManagementConfig.API_ROUTE)
export class QuestionManagementController {
  constructor(private questionService: QuestionService) {}

  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionService.readAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.readById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async deleteQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto
  ): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async updateQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.delete(id);
  }
}
