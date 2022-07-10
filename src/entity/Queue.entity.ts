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
    department: string;

    @Column()
    status: string;

    @ManyToOne(() => Visit, (visit) => visit.queue)
    @JoinColumn()
    visitor: Visit;

    @ManyToOne(() => User)
    served_by: User;
}
