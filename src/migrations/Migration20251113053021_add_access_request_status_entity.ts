import { Migration } from '@mikro-orm/migrations';

export class Migration20251113053021_add_access_request_status_entity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`access_request_status\` (\`id\` int unsigned not null auto_increment primary key, \`code\` varchar(255) not null, \`description\` varchar(255) not null, \`status\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`access_request_status\`;`);
  }

}
