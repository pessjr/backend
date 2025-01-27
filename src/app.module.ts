import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModuleModule } from './configurations/database-module/database-module.module';
import { AuthenticationModule } from './resources/authentication/authentication.module';
import { UserModule } from './resources/user/user.module';
import { PersonModule } from './resources/person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './configurations/roles-guard/roles-guard.guard';
import { ClientModule } from './resources/client/client.module';
import { EquipmentModule } from './resources/equipment/equipment.module';
import { BranchModule } from './resources/branch/branch.module';

@Module({
  imports: [
    DatabaseModuleModule,
    AuthenticationModule,
    UserModule,
    PersonModule,
    ClientModule,
    EquipmentModule,
    BranchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
