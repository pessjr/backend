import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/enums/RolesEnum';
import { Role } from 'src/resources/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create() {
    const roles = Object.entries(RolesEnum).map(([_, value], index) => ({
      id: index + 1,
      name: value,
    }));

    const count = await this.roleRepository.count();
    if (count === 0) {
      await this.roleRepository.save(roles);
      console.log('Recursos iniciais criados com sucesso!');
    }
  }
}
