import { Person } from 'src/resources/person/entities/person.entity';
import { User } from 'src/resources/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateBranchDto } from '../dto/create-branch.dto';

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

  static fromCreateDto(createBranchDto: CreateBranchDto) {
    const createdBy = new User();
    createdBy.id = createBranchDto.createdBy;

    const representative = new Person();
    representative.id = createBranchDto.representative;

    return {
      fantasyName: createBranchDto.fantasyName,
      companyName: createBranchDto.companyName,
      cnpj: createBranchDto.cnpj,
      createdBy,
      representative,
    } as unknown as Branch;
  }
}
