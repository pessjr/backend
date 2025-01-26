import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Person } from 'src/resources/person/entities/person.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        person: { email },
      },
      relations: ['person'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const person = await this.personRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (person) throw new ConflictException();

      const newPerson = this.personRepository.create({
        email: createUserDto.email,
      });
      this.personRepository.save(newPerson);
      const password = await this._encrypt(createUserDto.password);
      const newUser = this.userRepository.create({
        password,
        person: newPerson,
      });
      return await this.userRepository.save(newUser);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['person'],
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    if (updateUserDto.email) user.person.email = updateUserDto.email;
    if (updateUserDto.roles) user.roles = updateUserDto.roles;
    if (updateUserDto.password) {
      user.password = await this._encrypt(updateUserDto.password);
    }
    return await this.userRepository.save(user);
  }

  async _encrypt(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
