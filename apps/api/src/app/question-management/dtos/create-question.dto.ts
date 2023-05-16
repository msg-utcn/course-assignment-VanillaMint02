import { QuestionTopic } from '../model/question-topic';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the question',
    example: 'Why am I here?',
    required: true,
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'The content of the question',
    example: 'Idk',
    required: true,
  })
  content: string;

  @IsEnum({
    entity: QuestionTopic,
    validator: true,
  })
  @ApiProperty({
    description: 'The topic of the question',
    enum: QuestionTopic,
    example: QuestionTopic.JavaScript,
    required: true,
  })
  topic: QuestionTopic;
}
