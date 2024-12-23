import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000','http://localhost:5173'], // Adjust this to your Next.js frontend URL
    credentials: true,
  });

  // for image upload
  app.use(bodyParser.json({
    limit : '10mb'
  }));

  app.use(bodyParser.urlencoded({
    limit: '10mb', extended : true
  }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();