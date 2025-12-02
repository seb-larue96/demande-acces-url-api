import { Migration } from '@mikro-orm/migrations';

export class Migration20251202064558_add_role_to_user extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add \`role_id\` int unsigned not null;`);
    this.addSql(`alter table \`user\` add constraint \`user_role_id_foreign\` foreign key (\`role_id\`) references \`role\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`user\` add index \`user_role_id_index\`(\`role_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop foreign key \`user_role_id_foreign\`;`);

    this.addSql(`alter table \`user\` drop index \`user_role_id_index\`;`);
    this.addSql(`alter table \`user\` drop column \`role_id\`;`);
  }

}
