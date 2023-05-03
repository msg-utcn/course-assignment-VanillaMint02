import {ApiProperty} from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'My name',
    example: 'John Snow',
    required: true,
  })
  name: string;
  @ApiProperty({
    description: 'e-mail where I can be contacted',
    example: 'JohnSnow@Kingslanding.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'Password needed',
    example: 'TheUnbreakableUndefeatableUnfathomablePassword01',
    required: true,
  })
  password: string;
}
