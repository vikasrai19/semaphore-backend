import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { EventMembers } from '../src/main_event/entities/event-members.entity';
import { EventTeams } from '../src/main_event/entities/event-teams.entities';

config();
const configService = new ConfigService();
export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [EventMembers, EventTeams, 'dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};
export default new DataSource(datasourceOptions);
