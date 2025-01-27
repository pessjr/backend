import { Injectable } from '@nestjs/common';
import { RolesSeeder } from './roles.seeder';

@Injectable()
export class Seeder {
  constructor(private rolesSeeder: RolesSeeder) {}

  async seed() {
    await this.rolesSeeder.create();
  }
}
