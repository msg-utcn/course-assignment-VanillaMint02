import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { UpdateAnswerDto } from '../dtos/update-answer.dto';
import { AnswerDto } from '../dtos/answer.dto';
import { AnswerModel } from '../model/answer.model';
import { QuestionModel } from '../model/question.model';

export class AnswerMapper {
  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      rating: model.rating,
      creationDate: model.creationDate,
      parentId: model.parent.id,
    });
  }

  static mapCreateAnswerToModel(
    dto: CreateAnswerDto,
    parent: QuestionModel
  ): AnswerModel {
    return new AnswerModel({
      id: undefined,
      content: dto.content,
      rating: 0,
      parent,
      creationDate: new Date(),
    });
  }

  static mapUpdateAnswerToModel(
    dto: UpdateAnswerDto,
    oldModel: AnswerModel
  ): AnswerModel {
    return new AnswerModel({
      id: oldModel.id,
      content: dto.content,
      parent: oldModel.parent,
      rating: oldModel.rating,
      creationDate: oldModel.creationDate,
    });
  }
}
