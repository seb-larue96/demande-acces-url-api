import * as dotenv from 'dotenv';
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { MySqlDriver } from '@mikro-orm/mysql';

dotenv.config();

const config: MikroOrmModuleOptions = {
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    driver: MySqlDriver,
    migrations: {
        tableName: 'mo_migrations',
        path: process.env.NODE_ENV === 'production' ? './dist/migrations' : './src/migrations',
        pathTs: './src/migrations',
        emit: 'ts',
    },
    seeder: {
        path: process.env.NODE_ENV === 'production' ? './dist/database/seeders' : './src/database/seeders',
        pathTs: './src/database/seeders',
        defaultSeeder: 'DatabaseSeeder',
        emit: 'ts',
    },
};

export default config;