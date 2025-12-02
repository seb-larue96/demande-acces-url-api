import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/core";
import { AccessRequestStatusSeeder } from "./access-request-status.seeder";
import { RoleSeeder } from "./role.seeder";

export class DatabaseSeeder extends Seeder {
    async run (em: EntityManager): Promise<void> {
        await this.call(em, [AccessRequestStatusSeeder, RoleSeeder]);
    }
}