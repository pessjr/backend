import { Injectable } from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}
  findOne(id: number) {
    return this.personRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    return this.personRepository.save({ ...person, ...updatePersonDto });
  }
}
