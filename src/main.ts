import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Seeder } from './configurations/database/seeders/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(Seeder);
  await seeder.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
