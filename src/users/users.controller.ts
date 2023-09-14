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
import { CreateUserDto } from './dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUser: Partial<CreateUserDto>,
  ): Promise<UpdateResult> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
