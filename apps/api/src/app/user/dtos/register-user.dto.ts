import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @ApiProperty({
    description: 'My name',
    example: 'John Snow',
    required: true,
  })
  name: string;
  @IsEmail()
  @ApiProperty({
    description: 'e-mail where I can be contacted',
    example: 'JohnSnow@Kingslanding.com',
    required: true,
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    description: 'Password needed',
    example: 'TheUnbreakableUndefeatableUnfathomablePassword01',
    required: true,
  })
  password: string;
}
