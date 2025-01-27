import { Person } from 'src/resources/person/entities/person.entity';
import { User } from 'src/resources/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fantasy_name' })
  fantasyName: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column()
  cnpj: string;

  @OneToOne(() => User, (user) => user.branch)
  createdBy: User;

  @ManyToOne(() => Person, (person) => person.branches, { nullable: false })
  representative: Person;
}
