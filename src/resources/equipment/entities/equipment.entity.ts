import { Client } from 'src/resources/client/entities/client.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.equipment)
  client: Client;

  @OneToOne(() => Client)
  createdBy: Client;

  @Column({ name: 'equipment_type', nullable: true })
  equipmentType: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  version: string;

  @Column({ nullable: true })
  cc: number;

  @Column({ name: 'year_version', nullable: true })
  yearVersion: number;

  @Column({ name: 'year_model', nullable: true })
  yearModel: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  plate: string;

  @Column({ nullable: true })
  serial: string;

  static fromCreateDto(createEquipmentDto: CreateEquipmentDto): Equipment {
    const client = new Client();
    client.id = createEquipmentDto.clientId;

    const createdBy = new Client();
    createdBy.id = createEquipmentDto.createdById;

    return {
      client: client,
      createdBy: createdBy,
      equipmentType: createEquipmentDto.equipmentType,
      model: createEquipmentDto.model,
      version: createEquipmentDto.version,
      cc: createEquipmentDto.cc,
      yearVersion: createEquipmentDto.yearVersion,
      yearModel: createEquipmentDto.yearModel,
      color: createEquipmentDto.color,
      description: createEquipmentDto.description,
      plate: createEquipmentDto.plate,
      serial: createEquipmentDto.serial,
    } as unknown as Equipment;
  }
}
