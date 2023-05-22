import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import { Repository } from 'typeorm';
import { QuestionDto } from './dtos/question.dto';
import { QuestionMapper } from './mappers/question.mapper';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { UserModel } from '../user/models/user.model';
import { logger } from 'nx/src/utils/logger';
import { AnswerModel } from './model/answer.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>,
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>,
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>
  ) {}

  async readAll(): Promise<QuestionDto[]> {
    const foundModels = await this.questionModelRepository.find({
      relations: ['user'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => QuestionMapper.mapToDto(model));
  }

  async readAllByUser(userId: string): Promise<QuestionDto[]> {
    const foundUser = await this.userModelRepository.findOneBy({ id: userId });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const foundModels = await this.questionModelRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => QuestionMapper.mapToDto(model));
  }

  async readById(id: string): Promise<QuestionDto> {
    const foundModel = await this.readModelById(id);
    return QuestionMapper.mapToDto(foundModel);
  }

  async create(dto: CreateQuestionDto, userId: string): Promise<QuestionDto> {
    const userModel = await this.userModelRepository.findOneBy({ id: userId });
    logger.log(userModel);
    const model = QuestionMapper.mapCreateQuestionToModel(dto, userModel);
    logger.log(model.user);
    if (!userModel) {
      logger.log('Cannot find user');
      throw new BadRequestException();
    } else if (!model) {
      logger.log('Cannot find question');
      throw new BadRequestException();
    }
    try {
      const savedModel = await this.questionModelRepository.save(model);
      return QuestionMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<QuestionDto> {
    const foundModel = await this.readModelById(id);
    const updatedModel = QuestionMapper.mapUpdateQuestionToModel(
      dto,
      foundModel
    );

    try {
      const savedModel = await this.questionModelRepository.save(updatedModel);
      return QuestionMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'QuestionService.update');
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    const answerDeleteResult = await this.answerModelRepository.delete({
      parent: { id },
    });
    const deleteResult = await this.questionModelRepository.delete({ id });
    if (deleteResult.affected === 0 && answerDeleteResult.affected == 0) {
      throw new BadRequestException();
    }
  }

  private async readModelById(id: string): Promise<QuestionModel> {
    const foundModel = await this.questionModelRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
}
