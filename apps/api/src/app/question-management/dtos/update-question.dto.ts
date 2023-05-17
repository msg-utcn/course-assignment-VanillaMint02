import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @ApiProperty({
    description: 'the title of your question',
    example: 'InaccessibleObjectException',
    required: true,
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'the content of your question',
    example:
      'why does InaccessibleObjectException happen when I try to run my code?',
    required: true,
  })
  content: string;
}
