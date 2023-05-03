import {CreateAnswerDto} from '../dtos/create-answer.dto';
import {UpdateAnswerDto} from '../dtos/update-answer.dto';
import {AnswerDto} from '../dtos/answer.dto';
import {AnswerModel} from '../model/answer.model';
import {QuestionModel} from '../model/question.model';
import {UserModel} from "../../user/models/user.model";

export class AnswerMapper {
  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      rating: model.rating,
      creationDate: model.creationDate,
      parentId: model.parent.id,
      userId: model.postingUser.id,
    });
  }

  static mapCreateAnswerToModel(
    dto: CreateAnswerDto,
    parent: QuestionModel,
    user: UserModel,
  ): AnswerModel {
    return new AnswerModel({
      id: undefined,
      content: dto.content,
      rating: 0,
      parent,
      postingUser: user,
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
      postingUser: oldModel.postingUser,
      creationDate: oldModel.creationDate,
    });
  }
}
