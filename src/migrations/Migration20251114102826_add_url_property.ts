import { Migration } from '@mikro-orm/migrations';

export class Migration20251114102826_add_url_property extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`access_request\` add \`url\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`access_request\` drop column \`url\`;`);
  }

}
