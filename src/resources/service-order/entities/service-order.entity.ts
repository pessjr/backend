import { Client } from 'src/resources/client/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateServiceOrderDto } from '../dto/create-service-order.dto';

@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.serviceOrder)
  client: Client;

  @ManyToOne(() => Client)
  createdBy: Client;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  static fromCreateDto(
    createServiceOrderDto: CreateServiceOrderDto,
  ): ServiceOrder {
    const client = new Client();
    client.id = createServiceOrderDto.clientId;

    const createdBy = new Client();
    createdBy.id = createServiceOrderDto.createdBy;

    return {
      client,
      createdBy,
    } as unknown as ServiceOrder;
  }
}
