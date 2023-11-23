import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle(
      'NestJS + Typescript + GraphQL + Mikro-ORM + Postgresql + Alpha Vantage (API 3rd)',
    )
    .setDescription(
      'The stock API with NestJS + Typescript + GraphQL + Mikro-ORM + Postgresql + Alpha Vantage (API 3rd)',
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app
    .listen(parseInt(configService.get('SERVER_PORT')))
    .then((): void => {
      console.log(
        `Server is running at ${configService.get(
          'SERVER_HOST',
        )}:${configService.get('SERVER_PORT')} --version: 0.0.1`,
      );
      console.log(
        `Graphql Playground is hosted at ${configService.get(
          'SERVER_HOST',
        )}:${configService.get('SERVER_PORT')}/graphql`,
      );
      console.log(
        `Swagger is hosted at ${configService.get(
          'SERVER_HOST',
        )}:${configService.get('SERVER_PORT')}/docs`,
      );
      console.log(`Let start your joinery :)`);
    });
}
bootstrap().catch((err) => {
  console.log(err);
});
