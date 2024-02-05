import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../User/entity";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;
}
