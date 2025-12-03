import { Migration } from '@mikro-orm/migrations';

export class Migration20251203052846_add_level_property_to_role extends Migration {

  override async up(): Promise<void> {
    // 1. Add column as NULL so the ALTER TABLE succeeds
    this.addSql('alter table `role` add `level` int null;');

    // 2. Set level values for existing roles
    this.addSql(`update \`role\` set \`level\` = 1 where \`name\` = 'Guest';`);
    this.addSql(`update \`role\` set \`level\` = 2 where \`name\` = 'User';`);
    this.addSql(`update \`role\` set \`level\` = 3 where \`name\` = 'Admin';`);

    // 3. Make the column NOT NULL now that data is populated
    this.addSql('alter table `role` modify `level` int not null;');
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`role\` drop column \`level\`;`);
  }

}
