import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from 'src/resources/authentication/entities/authentication.entity';
import { Branch } from 'src/resources/branch/entities/branch.entity';
import { Client } from 'src/resources/client/entities/client.entity';
import { Equipment } from 'src/resources/equipment/entities/equipment.entity';
import { Person } from 'src/resources/person/entities/person.entity';
import { Role } from 'src/resources/roles/entities/role.entity';
import { ServiceOrder } from 'src/resources/service-order/entities/service-order.entity';
import { User } from 'src/resources/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.3',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'app_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        Authentication,
        User,
        Person,
        Equipment,
        Client,
        Branch,
        ServiceOrder,
        Role
      ],
    }),
  ],
})
export class DatabaseModuleModule {}
