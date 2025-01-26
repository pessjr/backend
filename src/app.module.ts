import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModuleModule } from './configurations/database-module/database-module.module';
import { AuthenticationModule } from './resources/authentication/authentication.module';
import { UserModule } from './resources/user/user.module';
import { PersonModule } from './resources/person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './configurations/roles-guard/roles-guard.guard';

@Module({
  imports: [
    DatabaseModuleModule,
    AuthenticationModule,
    UserModule,
    PersonModule,
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
