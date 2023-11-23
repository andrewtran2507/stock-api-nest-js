import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlushMode } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        tsNode: configService.get('NODE_DEV') === 'development' ? true : false,
        dbName: configService.get('POSTGRES_DB'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        type: 'postgresql',
        synchronize: true,
        allowGlobalContext: true,
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        flushMode: FlushMode.COMMIT,
        debug: configService.get('IS_DEBUG_POSTGRES'),
        migrations: {
          path: './src/migrations',
          tableName: 'migrations',
          transactional: true,
        },
        seeder: {
          path: 'dist/src/database/seeder',
          pathTs: 'src/database/seeder',
          defaultSeeder: 'DatabaseSeeder',
          glob: '!(*.d).{js,ts}',
          emit: 'ts',
          fileName: (className: string) => className, // seeder file naming convention
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
