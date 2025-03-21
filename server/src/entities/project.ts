import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  // Many projects are owned by one user
  @ManyToOne(() => User, user => user.projects)
  owner!: User;

  // One project can have many tasks
  @OneToMany(() => Task, task => task.project)
  tasks!: Task[];

  // One project can have many messages
  @OneToMany(() => Message, message => message.project)
  messages!: Message[];

  // Many users can be members of many projects (many-to-many)
  @ManyToMany(() => User)
  @JoinTable() // creates a join table automatically
  members!: User[];
}
