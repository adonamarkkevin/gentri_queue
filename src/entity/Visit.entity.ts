import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";
import { Queue } from "./Queue.entity";

@Entity({ name: "TBL_VISITS" })
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column()
    visit_purpose: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Queue, (queue) => queue.visitor)
    queue: Queue[];
}
