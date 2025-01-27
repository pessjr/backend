import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceOrder } from './entities/service-order.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ResponsePaginationDto } from 'src/dtos/responsePagination.dto';

@Injectable()
export class ServiceOrderService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}
  async create(createServiceOrderDto: CreateServiceOrderDto) {
    return await this.serviceOrderRepository.save(
      ServiceOrder.fromCreateDto(createServiceOrderDto),
    );
  }

  async findAll(pagination: PaginationDto, clientId: number) {
    const [data, total] = await this.serviceOrderRepository.findAndCountBy({
      client: { id: clientId },
    });

    const response = new ResponsePaginationDto<ServiceOrder>({
      data,
      total,
      currentPage: pagination.page,
      totalPages: Math.ceil(total / pagination.size),
    });

    return response;
  }

  async findOne(id: number) {
    return await this.serviceOrderRepository
      .findOneOrFail({ where: { id } })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async update(id: number, updateServiceOrderDto: UpdateServiceOrderDto) {
    const serviceOrder = await this.findOne(id);
    if (updateServiceOrderDto.clientId)
      serviceOrder.client.id = updateServiceOrderDto.clientId;
    if (updateServiceOrderDto.createdBy)
      serviceOrder.createdBy.id = updateServiceOrderDto.createdBy;
    return await this.serviceOrderRepository.save(serviceOrder);
  }

  async remove(id: number) {
    return await this.serviceOrderRepository.delete({ id });
  }
}
