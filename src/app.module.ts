import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middlewares/logger.middlewate';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "cats", method: RequestMethod.GET }
      );

    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "cats", method: RequestMethod.POST }
      );
  }
}
