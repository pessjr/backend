import { Authentication } from 'src/resources/authentication/entities/authentication.entity';
import { Role } from 'src/enums/Role';
import { Person } from 'src/resources/person/entities/person.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from 'src/resources/branch/entities/branch.entity';
import { ServiceOrder } from 'src/resources/service-order/entities/service-order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person, (person) => person.user)
  person: Person;

  @OneToMany(() => Authentication, (authentication) => authentication.user, {
    cascade: true,
  })
  authentications: Authentication[];

  @OneToMany(() => Branch, (branch) => branch.createdBy)
  branch: Branch[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.createdBy)
  serviceOrder: ServiceOrder[];

  @Column()
  password: string;

  @Column('enum', { enum: Role, array: true })
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
