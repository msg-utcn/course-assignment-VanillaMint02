import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({
    description: 'The content of the answer',
    example: 'InaccessibleObject exception means that the entity was not built',
    required: true,
  })
  id?: string;
  @ApiProperty({
    description: 'The content of the answer',
    example: 'InaccessibleObject exception means that the entity was not built',
    required: true,
  })
  content: string;
  @ApiProperty({
    description: 'The rating of the question. Starts at 0, counts up or down',
    example: 'Does not have an example, automatically increased or decreased',
    required: true,
  })
  rating?: number;
  @ApiProperty({
    description: 'The date of creation',
    example: 'Usually today, autogenerated',
    required: true,
  })
  creationDate: Date;
  @ApiProperty({
    description: 'The Id of the question related to this answer',
    example: 'some uuid you can find in the database',
    required: true,
  })
  parentId: string;
  @ApiProperty({
    description: 'The id of the posting user',
    required: true,
  })
  userId: string;

  constructor(values: Partial<AnswerDto>) {
    if (values) {
      this.id = values.id;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
      this.parentId = values.parentId;
    }
  }
}
