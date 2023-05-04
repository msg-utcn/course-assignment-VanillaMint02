import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({
    description: 'The content that has to change',
    example:
      'Correction, InaccessibleObjectException means that said object cannot be accessed',
    required: true,
  })
  content: string;
  @ApiProperty({
    description: 'new value for rating',
    example: '2',
    required: true,
  })
  rating: number;
}
