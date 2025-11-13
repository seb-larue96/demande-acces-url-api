import { Entity, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { AccessRequestStatus } from "src/application/references/access-request-status/entities/access-request-status.entity";
import { User } from "src/application/users/entities/user.entity";

@Entity()
export class AccessRequest {
    @PrimaryKey()
    id: number;

    @Property()
    @Unique()
    requestNumber: string;

    @ManyToOne(() => User)
    requester: User;

    @Property()
    reasonToRequest: string;

    @Property({ nullable: true })
    reasontToReject: string;

    @ManyToOne(() => AccessRequestStatus)
    requestStatus: AccessRequestStatus;
    
    @Property()
    status: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), nullable: true })
    updatedAt?: Date = new Date();
}
