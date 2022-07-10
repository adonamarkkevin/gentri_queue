import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Visit } from "./Visit.entity";

@Entity({ name: "TBL_QUEUE" })
export class Queue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    queue_number: string;

    @Column()
    department: string;

    @Column({ default: "on queue" })
    status: string;

    @Column({ nullable: true })
    served_by: string;

    @Column()
    visit_purpose: string;

    @ManyToOne(() => Visit, (visit) => visit.queue, { cascade: true })
    @JoinColumn()
    visitor: Visit;
}
