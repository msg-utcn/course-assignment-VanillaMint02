import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnswerModel } from './model/answer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerDto } from './dto/answer.dto';
import { AnswerMapper } from './mapper/answer.mapper';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>
  ) {}

  async readAll(): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find();
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  async readAnswerByContent(content: string): Promise<AnswerDto> {
    const foundModel = await this.answerModelRepository.findOne({
      where: { content },
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
  async readModelById(id: string): Promise<AnswerDto> {
    const foundModel = await this.answerModelRepository.findOne({
      where: { id },
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
  async createAnswer(dto: CreateAnswerDto): Promise<AnswerDto> {
    const model = AnswerMapper.mapCreateAnswerToDto(dto);
    const savedModel = await this.answerModelRepository.save(model);
    return AnswerMapper.mapToDto(savedModel);
  }
  async delete(id: string): Promise<void> {
    const deletedResult = await this.answerModelRepository.delete({ id });
    if (deletedResult.affected == 0) {
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
      Logger.log(error, 'QuestionService.update');
      throw new BadRequestException();
    }
  }
}
