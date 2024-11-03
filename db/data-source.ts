import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { EventMembers } from '../src/main_event/entities/event-members.entity';
import { EventTeams } from '../src/main_event/entities/event-teams.entities';

config();
const configService = new ConfigService();
export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [EventMembers, EventTeams, 'dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};
export default new DataSource(datasourceOptions);
