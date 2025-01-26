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
