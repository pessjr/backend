import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/enums/RolesEnum';
import { Person } from 'src/resources/person/entities/person.entity';
import { Role } from 'src/resources/roles/entities/role.entity';
import { User } from 'src/resources/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create() {
    const person = new Person();
    person.name = 'Admin';
    person.email = 'admin@localhost';
    
    const user = new User();

    user.password = 'admin';
    user.roles = [RolesEnum.ADMIN];

    person.user
  }
}
