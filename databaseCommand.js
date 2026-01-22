import chalk from "chalk";
import inquirer from "inquirer";
import { Pool } from "pg";
import express from "express";
import promptUser from "./lib/prompt.js";
import sqlFunctions from "./lib/sql.js";

const app = express();
const PORT = process.env.PORT || 3001;

console.log(chalk.green("Welcome to the Inventory Management System"));

promptUser();

//const result = await pool.query("SELECT * FROM products");
//console.table(result.rows);
