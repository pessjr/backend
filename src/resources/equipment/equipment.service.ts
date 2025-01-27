import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { ResponsePaginationDto } from 'src/dtos/responsePagination.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    const client = await this.clientRepository.findOne({
      where: { id: createEquipmentDto.clientId },
    });
    if (!client) throw new NotFoundException();

    const createdBy = new Client();
    createdBy.id = createEquipmentDto.createdById;

    const payload = Equipment.fromCreateDto(createEquipmentDto);

    return await this.equipmentRepository.save(payload);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, size } = paginationDto;
    const [data, total] = await this.equipmentRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    const response = new ResponsePaginationDto<Equipment>({
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / size),
    });
    return response;
  }

  async findOne(id: number) {
    return await this.equipmentRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.findOne(id);
    if (!equipment) throw new NotFoundException();
    Object.assign(equipment, updateEquipmentDto);
    return await this.equipmentRepository.save(equipment);
  }

  async remove(id: number) {
    const equipment = await this.findOne(id);
    if (!equipment) throw new NotFoundException();
    return await this.equipmentRepository.remove(equipment);
  }
}
