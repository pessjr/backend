import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { In, Repository } from 'typeorm';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    const branch = Branch.fromCreateDto(createBranchDto);
    return await this.branchRepository.save(branch);
  }

  async findAll(clientId: number) {
    return await this.branchRepository.find({
      where: { representative: { id: clientId } },
    });
  }

  async findOne(id: number) {
    return await this.branchRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(id);
    const updatedBranch = {
      ...branch,
    };
    if (updateBranchDto.fantasyName)
      updatedBranch.fantasyName = updateBranchDto.fantasyName;
    if (updateBranchDto.companyName)
      updatedBranch.companyName = updateBranchDto.companyName;
    if (updateBranchDto.cnpj) updatedBranch.cnpj = updateBranchDto.cnpj;

    if (updateBranchDto.representative) {
      const representative = await this.personRepository.findOne({
        where: { id: updateBranchDto.representative },
      });
      if (!representative) throw new BadRequestException();
      updatedBranch.representative = representative;
    }
    return await this.branchRepository.save(updatedBranch);
  }

  async remove(id: number) {
    return await this.branchRepository.delete({ id });
  }
}
