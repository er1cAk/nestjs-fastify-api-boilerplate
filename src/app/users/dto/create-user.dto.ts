import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNumber()
  @ApiProperty()
  companyId: number;

  @IsString()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @ApiPropertyOptional()
  lastName: string;
}
