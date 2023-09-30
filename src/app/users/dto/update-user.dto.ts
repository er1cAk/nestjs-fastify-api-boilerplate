import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @ApiPropertyOptional()
  lastName: string;
}
