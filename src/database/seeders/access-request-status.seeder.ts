import { EntityManager } from "@mikro-orm/mysql";
import { Seeder } from "@mikro-orm/seeder";

export class AccessRequestStatusSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const statuses = [
            { code: "Pending", description: "Pending Approval", status: "I" },
            { code: "Approved", description: "Approved Request", status: "I" },
            { code: "Rejected", description: "Rejected Request", status: "I" },
            { code: "Cancelled", description: "Cancelled by User", status: "I" },
        ];

        for (const statusData of statuses) {
            const existing = await em.findOne('AccessRequestStatus', { code: statusData.code });
            if (!existing) {
                em.create('AccessRequestStatus', statusData);
            }
        }
    }
}