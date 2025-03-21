import "reflect-metadata";
import { DataSource } from "typeorm";
import { Message } from "./entities/message";
import { Project } from "./entities/project";
import { Task } from "./entities/task";
import { User } from "./entities/user";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "taskflow_db",
  synchronize: true, // set to false in production and use migrations instead
  logging: false,
  entities: [User, Project, Task, Message],
  migrations: [],
  subscribers: []
});
