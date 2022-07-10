import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";
import { Queue } from "./Queue.entity";

@Entity({ name: "TBL_USERS" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    birthdate: string;

    @Column()
    address: string;

    @Column()
    brgy: string;

    @Column()
    municipality: string;

    @Column()
    province: string;

    @Column()
    department: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Queue, (queue) => queue.served_by)
    queue: Queue[];
}
