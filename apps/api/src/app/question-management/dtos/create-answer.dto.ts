import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'The content of the answer',
    example: 'InaccessibleObject exception means that the entity was not built',
    required: true,
  })
  content: string;
}
