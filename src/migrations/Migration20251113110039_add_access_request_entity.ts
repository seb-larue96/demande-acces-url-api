import { Migration } from '@mikro-orm/migrations';

export class Migration20251113110039_add_access_request_entity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`access_request\` (\`id\` int unsigned not null auto_increment primary key, \`request_number\` varchar(255) not null, \`requester_id\` int unsigned not null, \`reason_to_request\` varchar(255) not null, \`reasont_to_reject\` varchar(255) null, \`request_status_id\` int unsigned not null, \`status\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`access_request\` add unique \`access_request_request_number_unique\`(\`request_number\`);`);
    this.addSql(`alter table \`access_request\` add index \`access_request_requester_id_index\`(\`requester_id\`);`);
    this.addSql(`alter table \`access_request\` add index \`access_request_request_status_id_index\`(\`request_status_id\`);`);

    this.addSql(`alter table \`access_request\` add constraint \`access_request_requester_id_foreign\` foreign key (\`requester_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`access_request\` add constraint \`access_request_request_status_id_foreign\` foreign key (\`request_status_id\`) references \`access_request_status\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`access_request\`;`);
  }

}
