import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from 'src/resources/authentication/entities/authentication.entity';
import { Person } from 'src/resources/person/entities/person.entity';
import { User } from 'src/resources/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.4',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'app_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Authentication, User, Person],
    }),
  ],
})
export class DatabaseModuleModule {}
