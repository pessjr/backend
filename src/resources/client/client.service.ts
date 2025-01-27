import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/entities/person.entity';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ResponsePaginationDto } from 'src/dtos/responsePagination.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const person = await this.personRepository.findOne({
      where: { id: createClientDto.personId },
    });

    if (!person) throw new NotFoundException();

    const createdPerson = await this.personRepository.findOne({
      where: { id: createClientDto.createdBy },
    });
    if (!createdPerson) throw new NotFoundException();

    const client = this.clientRepository.create({
      person,
      createdBy: createdPerson,
      merge: createClientDto.merge,
    });
    return await this.clientRepository.save(client);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, size } = paginationDto;
    const [data, total] = await this.clientRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    const response = new ResponsePaginationDto<Client>({
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / size),
    });
    return response;
  }

  async findOne(id: number) {
    return await this.clientRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    if (!client) throw new NotFoundException();
    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if (!client) throw new NotFoundException();
    return await this.clientRepository.remove(client);
  }
}
