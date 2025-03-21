// src/entities/User.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";
import { Project } from "./project";
import { Task } from "./task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "user" })
  role!: string;

  // One user can own many projects
  @OneToMany(() => Project, project => project.owner)
  projects!: Project[];

  // One user can be assigned many tasks
  @OneToMany(() => Task, task => task.assignedUser)
  tasks!: Task[];

  // One user can send many messages
  @OneToMany(() => Message, message => message.sender)
  messages!: Message[];
}
