import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Vikas@2001',
  database: 'semaphore',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const datasource = new DataSource(datasourceOptions);
export default datasource;
