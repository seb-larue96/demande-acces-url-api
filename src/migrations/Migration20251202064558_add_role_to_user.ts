import { Migration } from '@mikro-orm/migrations';

export class Migration20251202064558_add_role_to_user extends Migration {

  override async up(): Promise<void> {
    // 1. Add column as nullable
    this.addSql(`alter table \`user\` add \`role_id\` int unsigned null;`);

    // 2. Populate existing users with default role
    // Replace 1 with the actual id of your USER role
    this.addSql(`update \`user\` set \`role_id\` = 1 where \`role_id\` is null;`);

    // 3. Make column NOT NULL
    this.addSql(`alter table \`user\` modify \`role_id\` int unsigned not null;`);

    // 4. Add foreign key
    this.addSql(`alter table \`user\` add constraint \`user_role_id_foreign\` foreign key (\`role_id\`) references \`role\` (\`id\`) on update cascade;`);

    // 5. Add index
    this.addSql(`alter table \`user\` add index \`user_role_id_index\`(\`role_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop foreign key \`user_role_id_foreign\`;`);
    this.addSql(`alter table \`user\` drop index \`user_role_id_index\`;`);
    this.addSql(`alter table \`user\` drop column \`role_id\`;`);
  }

}
