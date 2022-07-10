import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    AfterInsert,
    AfterLoad,
} from "typeorm";
import { Queue } from "./Queue.entity";

@Entity({ name: "TBL_VISITS" })
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    fullName: string;

    @Column()
    birthdate: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    contact_number: string;

    @Column()
    address: string;

    @Column()
    brgy: string;

    @Column()
    municipality: string;

    @Column()
    province: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Queue, (queue) => queue.visitor)
    queue: Queue[];

    @AfterInsert()
    @AfterLoad()
    setFullname() {
        this.fullName = this.firstName + " " + this.lastName;
    }
}
