import * as dotenv from 'dotenv';
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from 'src/application/users/entities/user.entity';
import { AccessRequestStatus } from 'src/application/references/access-request-status/entities/access-request-status.entity';

dotenv.config();

const config: MikroOrmModuleOptions = {
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
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
    }
};

export default config;