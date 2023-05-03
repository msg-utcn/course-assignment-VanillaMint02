import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {AnswerDto} from './dtos/answer.dto';
import {UpdateAnswerDto} from './dtos/update-answer.dto';
import {AnswerModel} from './model/answer.model';
import {AnswerMapper} from './mappers/answer.mapper';
import {CreateAnswerDto} from './dtos/create-answer.dto';
import {QuestionModel} from './model/question.model';
import {UserModel} from "../user/models/user.model";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>,
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>,
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {
  }

  async readAll(): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find();
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  async readById(id: string): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);
    return AnswerMapper.mapToDto(foundModel);
  }

  async create(dto: CreateAnswerDto, questionId: string, userId: string): Promise<AnswerDto> {
    const foundQuestion = await this.questionModelRepository.findOneBy({
      id: questionId,
    });
    const foundUser = await this.userModelRepository.findOneBy({id: userId});
    const model = AnswerMapper.mapCreateAnswerToModel(dto, foundQuestion, foundUser);
    if (!foundQuestion && !model && !foundUser) {
      throw new BadRequestException();
    }
    try {
      const savedModel = await this.answerModelRepository.save(model);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);
    const updatedModel = AnswerMapper.mapUpdateAnswerToModel(dto, foundModel);

    try {
      const savedModel = await this.answerModelRepository.save(updatedModel);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.answerModelRepository.delete({id});
    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }
  }

  async readAllByQuestionId(questionId: string): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find({
      where: {parent: {id: questionId}},
      relations: ['parent'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  async readAllByUserId(userId: string): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find({
      where: {parent: {id: userId}},
      relations: ['postingUser'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  private async readModelById(id: string): Promise<AnswerModel> {
    const foundModel = await this.answerModelRepository.findOne({
      where: {id},
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
}
