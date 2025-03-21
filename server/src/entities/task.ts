import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";
import { Project } from "./project";
import { User } from "./user";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: "timestamp", nullable: true })
  dueDate!: Date;

  @Column({ default: "pending" })
  status!: string;

  // Many tasks belong to one project
  @ManyToOne(() => Project, project => project.tasks)
  project!: Project;

  // A task may be assigned to one user (nullable if unassigned)
  @ManyToOne(() => User, user => user.tasks, { nullable: true })
  assignedUser!: User;

  // One task can have many messages (if using task-specific chats)
  @OneToMany(() => Message, message => message.task)
  messages!: Message[];
}
