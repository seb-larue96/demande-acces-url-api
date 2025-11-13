import { PrimaryKey, Property } from "@mikro-orm/core";

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