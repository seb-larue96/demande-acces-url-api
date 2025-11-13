import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class AccessRequestStatus {
    @PrimaryKey()
    id: number;

    @Property()
    code: string;

    @Property()
    description: string;

    @Property()
    status: string;
}