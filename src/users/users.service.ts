import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: DeepPartial<User>): Promise<number> {
    const newUser = this.usersRepository.create(user);
    return (await this.usersRepository.save(newUser)).id;
  }

  async update(
    id: number,
    user: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
