import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UsersResponse } from './enums';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [User], description: UsersResponse.USERS_FOUND })
  @ApiNotFoundResponse({ description: UsersResponse.USERS_NOT_FOUND })
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: UsersResponse.USER_FOUND })
  @ApiNotFoundResponse({ description: UsersResponse.USER_NOT_FOUND })
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: UsersResponse.USER_CREATED,
    type: 'number',
  })
  @ApiForbiddenResponse({ description: UsersResponse.USER_CREATE_FAILED })
  createUser(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
