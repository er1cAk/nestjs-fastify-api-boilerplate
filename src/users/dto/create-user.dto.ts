import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  companyId: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;
}
