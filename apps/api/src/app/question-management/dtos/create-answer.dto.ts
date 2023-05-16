import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @ApiProperty({
    description: 'The content of the answer',
    example: 'InaccessibleObject exception means that the entity was not built',
    required: true,
  })
  content: string;
}
