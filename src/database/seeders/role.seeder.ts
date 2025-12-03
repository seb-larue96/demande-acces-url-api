import { EntityManager } from "@mikro-orm/mysql";
import { Seeder } from "@mikro-orm/seeder";

export class RoleSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const roles = [
            {name: 'Admin', level: 3, status: 'I'},
            {name: 'User', level: 2, status: 'I'},
            {name: 'Guest', level: 1, status: 'I'}
        ];

        for (const roleData of roles) {
            const existing = await em.findOne('Role', { name: roleData.name });
            if (!existing) {
                em.create('Role', roleData);
            }
        }
    }
}