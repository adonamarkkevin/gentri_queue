import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    AfterInsert,
    AfterLoad,
} from "typeorm";

@Entity({ name: "TBL_USERS" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

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

    @AfterInsert()
    @AfterLoad()
    setFullname() {
        this.fullName = this.firstName + " " + this.lastName;
    }
}
