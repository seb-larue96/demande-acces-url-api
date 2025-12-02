import { Migration } from '@mikro-orm/migrations';

export class Migration20251202072402_remove_unique_attribute_to_email extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` drop index \`user_email_unique\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);
  }

}
