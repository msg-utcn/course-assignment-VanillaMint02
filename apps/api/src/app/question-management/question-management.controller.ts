import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {QuestionDto} from './dtos/question.dto';
import {QuestionService} from './question.service';
import {CreateQuestionDto} from './dtos/create-question.dto';
import {UpdateQuestionDto} from './dtos/update-question.dto';
import {ApiBearerAuth, ApiForbiddenResponse, ApiTags} from '@nestjs/swagger';
import {QuestionManagementConfig} from './question-management.config';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {AnswerService} from './answer.service';
import {AnswerDto} from './dtos/answer.dto';
import {AnswerConfig} from './answer.config';
import {UpdateAnswerDto} from './dtos/update-answer.dto';
import {CreateAnswerDto} from './dtos/create-answer.dto';
import {Roles} from "../auth/roles.decorator";
import {UserRole} from "../user/models/user-roles";
import {RolesGuard} from "../auth/roles.guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(QuestionManagementConfig.SWAGGER_FEATURE)
@Controller(QuestionManagementConfig.API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {
  }

  @Get("userId/:userId")
  async getAllQuestionsByUserId(@Param('userId') userId: string): Promise<QuestionDto[]> {
    return this.questionService.readAllByUser(userId);
  }

  @Get()
  async getAllQuestions() {
    return this.questionService.readAll();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.readById(id);
  }

  @Get('answers/:userId')
  async getAllAnswersByUser(
    @Param('userId') userId: string
  ): Promise<AnswerDto[]> {
    return this.answerService.readAllByQuestionId(userId);
  }

  @Get('answers/:userId')
  async getAllAnswersByUserId(@Param('userId') userId:string):Promise<AnswerDto[]>{
    return this.answerService.readAllByUserId(userId);
  }

  @Post("userId/:userId")
  async createQuestion(@Body() dto: CreateQuestionDto, @Param("userId") userId: string): Promise<QuestionDto> {
    return this.questionService.create(dto, userId);
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto
  ): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiForbiddenResponse({
      description: "What happens if someone tries to disturb the force"
    }
  )
  async deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.delete(id);
  }



  @Get(':questionId/answers')
  async getAllAnswers(
    @Param('questionId') questionId: string
  ): Promise<AnswerDto[]> {
    return this.answerService.readAllByQuestionId(questionId);
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

  @Post(':questionId/:userId/answers')
  async addAnswer(
    @Body() answerDto: CreateAnswerDto,
    @Param('questionId') questionId: string,
    @Param('userId') userId: string,
  ): Promise<AnswerDto> {
    return this.answerService.create(answerDto, questionId, userId);
  }
}
