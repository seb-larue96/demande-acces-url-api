import * as dotenv from 'dotenv';
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from 'src/application/users/entities/user.entity';

dotenv.config();

const config: MikroOrmModuleOptions = {
    entities: [User],
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
};

export default config;