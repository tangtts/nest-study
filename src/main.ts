import { logger,LoggerMiddleware } from 'src/middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ParseIntPipe } from './pipes/parse-int.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 可以验证传入的值的类型，
  // 加入白名单的时候，当用户传入多余参数的时候，可以自动去除
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // 可以做类型转化
      transform: true,
      // forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(logger,new LoggerMiddleware().use)
  await app.listen(3000);
}
bootstrap();
