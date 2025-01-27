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

  @OneToOne(() => Branch, (branch) => branch.createdBy)
  branch: Branch;

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
