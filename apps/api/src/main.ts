/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QuestionManagementConfig } from './app/question-management/question-management.config';
import { AuthConfig } from './app/auth/auth.config';
import { UserConfig } from './app/user/user.config';
import { AnswerConfig } from './app/question-management/answer.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const version = '1.0';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('StackUnderflow API')
    .setDescription('The UTCN Course API for Question Management')
    .setVersion(version)
    .addTag(QuestionManagementConfig.SWAGGER_FEATURE)
    .addTag(UserConfig.SWAGGER_FEATURE)
    .addTag(AuthConfig.SWAGGER_FEATURE)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
