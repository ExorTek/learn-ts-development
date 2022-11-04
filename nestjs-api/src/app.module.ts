import { Module } from '@nestjs/common';
import { HelloWorldModule } from './helloWorld.module';
import { HelloWorldController } from './helloWorld.controller';

@Module({
  imports: [HelloWorldModule],
  controllers: [HelloWorldController]
})
export class AppModule {}
