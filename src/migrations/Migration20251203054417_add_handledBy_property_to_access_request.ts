import { Migration } from '@mikro-orm/migrations';

export class Migration20251203054417_add_handledBy_property_to_access_request extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`access_request\` add \`handled_by_id\` int unsigned null;`);
    this.addSql(`alter table \`access_request\` add constraint \`access_request_handled_by_id_foreign\` foreign key (\`handled_by_id\`) references \`user\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`access_request\` add index \`access_request_handled_by_id_index\`(\`handled_by_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`access_request\` drop foreign key \`access_request_handled_by_id_foreign\`;`);

    this.addSql(`alter table \`access_request\` drop index \`access_request_handled_by_id_index\`;`);
    this.addSql(`alter table \`access_request\` drop column \`handled_by_id\`;`);
  }

}
