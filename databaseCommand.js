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

const questions = [
  {
    type: "list",
    name: "action",
    message: "Choose an action:",
    choices: [
      "View All Products",
      "View Low Inventory",
      "View All Suppliers",
      "Add Product",
      "Add Supplier",
      "Restock Product",
      "Record Sale",
      "Update Product",
      "Delete Product",
      "Exit",
    ],
  },
];

console.log(chalk.green("Welcome to the Inventory Management System"));

const result = await pool.query("SELECT * FROM products");
console.table(result.rows);
