import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}
  async create(createBranchDto: CreateBranchDto) {}

  async findAll(clientId: number) {}

  async findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  async remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
