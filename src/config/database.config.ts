import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): {
  database: Record<string, TypeOrmModuleOptions>;
} => ({
  database: {
    main: {
      type: 'postgres',
      host: process.env['POSTGRES_HOST'],
      port: +process.env['POSTGRES_PORT'],
      username: process.env['POSTGRES_USERNAME'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DATABASE'],
      autoLoadEntities: true,
      synchronize: true,
    },
  },
});
