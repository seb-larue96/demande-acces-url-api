import { BeforeCreate, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import * as bcrypt from 'bcrypt';
import { Role } from "src/application/roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    surname: string;

    @Property({ unique: true })
    email: string;

    @Property({ hidden: true })
    password: string;

    @ManyToOne(() => Role)
    role: Role;

    @Property()
    status: string;

    @Property()
    isActive: boolean = true;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), nullable: true })
    updatedAt?: Date = new Date();

    @BeforeCreate()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
