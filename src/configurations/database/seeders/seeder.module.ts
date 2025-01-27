import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeder } from './seeder';
import { Role } from 'src/resources/roles/entities/role.entity';
import { RolesSeeder } from './roles.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [Seeder, RolesSeeder],
})
export class SeederModule {}
