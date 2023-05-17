import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @IsString()
  @ApiProperty({
    description: 'The content that has to change',
    example:
      'Correction, InaccessibleObjectException means that said object cannot be accessed',
    required: true,
  })
  content: string;
  @IsNumber()
  @ApiProperty({
    description: 'new value for rating',
    example: '2',
    required: true,
  })
  rating: number;
}
