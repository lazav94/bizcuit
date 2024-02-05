import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../api/User/entity";
import { Todo } from "../api/Todo/entity";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "todo";
const DB_PORT = parseInt(process.env.DB_PORT!) || 5432;
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  subscribers: [],
  migrations: [],
});

export default async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB connection successfully created");
  } catch (error) {
    throw new Error("DB connection failed");
  }
};
