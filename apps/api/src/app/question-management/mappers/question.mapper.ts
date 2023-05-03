import {CreateQuestionDto} from '../dtos/create-question.dto';
import {QuestionModel} from '../model/question.model';
import {UpdateQuestionDto} from '../dtos/update-question.dto';
import {QuestionDto} from '../dtos/question.dto';
import {UserModel} from "../../user/models/user.model";

export class QuestionMapper {
  static mapCreateQuestionToModel(dto: CreateQuestionDto,
                                  user: UserModel): QuestionModel {
    return new QuestionModel({
      id: undefined,
      postedBy: user.name,
      rating: 0,
      title: dto.title,
      user,
      content: dto.content,
      topic: dto.topic,
      creationDate: new Date().toISOString(),
      answers: [],
    });
  }

  static mapUpdateQuestionToModel(
    dto: UpdateQuestionDto,
    oldModel: QuestionModel
  ): QuestionModel {
    return new QuestionModel({
      ...oldModel,
      user: oldModel.user,
      rating: oldModel.rating,
      title: dto.title,
      content: dto.content,
    });
  }

  static mapToDto(model: QuestionModel): QuestionDto {
    return new QuestionDto({
      id: model.id,
      title: model.title,
      postedBy: model.user.id,
      content: model.content,
      topic: model.topic,
      rating: model.rating,
      creationDate: model.creationDate,
      userId: model.user.id,
    });
  }
}
