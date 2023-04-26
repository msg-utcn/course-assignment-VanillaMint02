import { AnswerModel } from '../model/answer.model';
import { AnswerDto } from '../dto/answer.dto';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';

export class AnswerMapper {
  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      rating: model.rating,
      creationDate: model.creationDate,
    });
  }

  static mapCreateAnswerToDto(dto: CreateAnswerDto): AnswerModel {
    return new AnswerModel({
      id: undefined,
      content: dto.content,
      rating: 0,
      creationDate: new Date(),
    });
  }
  static mapUpdateAnswerToModel(
    dto: UpdateAnswerDto,
    oldModel: AnswerModel
  ): AnswerModel {
    return new AnswerModel({
      ...oldModel,
      content: dto.content,
      rating: dto.rating,
    });
  }
}
