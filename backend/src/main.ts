import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  // Enabling Swagger
  const makeDocument = () => {
    const config = new DocumentBuilder()
    .setTitle('countryCodeAPI')
    .setDescription('countryCodeAPI swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    return SwaggerModule.createDocument(app, config);
  };
  
  SwaggerModule.setup('docs', app, makeDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // Strip unknown properties
    forbidNonWhitelisted: true,
    transform: true,      // Auto-transform payloads to DTO instances
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();