import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';

config();
const configService = new ConfigService();
export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};
new DataSource(datasourceOptions);
