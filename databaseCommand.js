import chalk from "chalk";
import inquirer from "inquirer";
import { Pool } from "pg";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log(chalk.green("Welcome to the Inventory Management System"));

const result = await pool.query("SELECT * FROM products");
console.table(result.rows);
