import { Entity, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";
import { AccessRequestStatus } from "../../references/access-request-status/entities/access-request-status.entity";

@Entity()
export class AccessRequest {
    @PrimaryKey()
    id: number;

    @Property()
    @Unique()
    requestNumber: string;

    @Property()
    Url: string;

    @ManyToOne(() => User)
    requester: User;

    @Property()
    reasonToRequest: string;

    @Property({ nullable: true })
    reasonToReject?: string;

    @ManyToOne(() => AccessRequestStatus)
    requestStatus: AccessRequestStatus;
    
    @Property()
    status: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), nullable: true })
    updatedAt?: Date = new Date();
}
