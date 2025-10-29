import { Migration } from '@mikro-orm/migrations';

export class Migration20251029104343_initialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`surname\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`status\` varchar(255) not null, \`is_active\` tinyint(1) not null default true, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`user\`;`);
  }

}
