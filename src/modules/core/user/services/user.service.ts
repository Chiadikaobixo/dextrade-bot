import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDetails } from 'src/@types/interface';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logUser(user: IUserDetails) {
    const userExist = await this.userRepository.find({
      where: [{ telegram_id: user.telegram_id }],
    });
    if (userExist.length > 0) return;

    const userEntity = {
      telegram_id: user.telegram_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    };
    const newLoggedUser = this.userRepository.create(userEntity);
    return this.userRepository.save(newLoggedUser);
  }
}
