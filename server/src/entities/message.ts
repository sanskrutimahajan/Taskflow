import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  // Message sender (user)
  @ManyToOne(() => User, user => user.messages)
  sender!: User;

  // Message can be associated with a project (optional)
  @ManyToOne(() => Project, project => project.messages, { nullable: true })
  project!: Project;

  // Or it can be associated with a task (optional)
  @ManyToOne(() => Task, task => task.messages, { nullable: true })
  task!: Task;

  // Automatically set the timestamp when message is created
  @CreateDateColumn()
  timestamp!: Date;
}
