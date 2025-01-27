import { Equipment } from 'src/resources/equipment/entities/equipment.entity';
import { Person } from 'src/resources/person/entities/person.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person, (person) => person.user)
  person: Person;

  @OneToOne(() => Person)
  createdBy: Person;

  @OneToMany(() => Equipment, (equipment) => equipment.client)
  equipment: Equipment[];

  @Column({ default: false })
  merge: boolean;
}
