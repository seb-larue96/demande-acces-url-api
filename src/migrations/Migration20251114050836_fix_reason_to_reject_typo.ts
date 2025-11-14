import { Migration } from '@mikro-orm/migrations';

export class Migration20251114050836_fix_reason_to_reject_typo extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`access_request\` change \`reasont_to_reject\` \`reason_to_reject\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`access_request\` change \`reason_to_reject\` \`reasont_to_reject\` varchar(255) null;`);
  }

}
