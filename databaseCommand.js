import chalk from "chalk";
import promptUser from "./lib/prompt.js";

console.log(chalk.blue("Welcome to the Inventory Management System"));
console.log(chalk.blue("========================================="));
console.log("\n");

promptUser();
