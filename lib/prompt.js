import inquirer from "inquirer";
import chalk from "chalk";
import sqlFunctions from "./sql.js";
import sql from "./sql.js";

const questions = [
  {
    type: "select",
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

const addProductQuestions = [
  {
    type: "input",
    name: "addProductName",
    message: "Enter the product name:",
    validate: (input) => input !== "" || "Product name cannot be empty.",
  },
  {
    type: "select",
    name: "addProductCategory",
    message: "Select the product category:",
    choices: [
      "Writing Instruments",
      "Paper Products",
      "Filing & Organization",
      "Desk Accessories",
      "Technology",
      "Mailing & Shipping",
      "Furniture",
      "Breakroom",
      "Cleaning",
      "Labels & Stamps",
      "Planning",
      "Miscellaneous",
    ],
  },
  {
    type: "input",
    name: "addProductPrice",
    message: "Enter the product price:",
    validate: (input) => {
      const value = parseFloat(input);
      return (
        (!isNaN(value) && value > 0) ||
        "Please enter a valid positive number for price."
      );
    },
  },
  {
    type: "input",
    name: "addProductStock",
    message: "Enter the initial stock quantity:",
    validate: (input) => {
      const value = parseInt(input, 10);
      return (
        (Number.isInteger(value) && value >= 0) ||
        "Please enter a valid non-negative integer for stock quantity."
      );
    },
  },
  {
    type: "select",
    name: "addProductSupplier",
    message: "Select the supplier for this product:",
    choices: async () => {
      const result = await sqlFunctions.getAllSuppliersNames();
      if (result.rows.length > 0) {
        return result.rows.map((supplier) => supplier.name);
      } else {
        console.log(
          chalk.yellow("No suppliers found. Please add a supplier first."),
        );
        return [];
      }
    },
  },
];

const restockProductQuestions = [
  {
    type: "input",
  },
];

const addSupplierQuestions = [
  {
    type: "input",
    name: "addSupplierName",
    message: "Enter the supplier name:",
    validate: async (input) => {
      if (input === "") {
        return "Supplier name cannot be empty.";
      }
      const exists = await sqlFunctions.checkSupplierExists(input);
      if (exists) {
        return "Supplier already exists. Please enter a different name.";
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "addSupplierContact",
    message: "Enter the supplier email information:",
  },
  {
    type: "input",
    name: "addSupplierPhone",
    message: "Enter the supplier phone number, e.g. (555-555-5555):",
  },
];

// Adds an output for selecting another action
function addActionPrompt() {
  console.log(chalk.green("\n\n\n\nSelect another action."));
}

// prompts user for actions, beginning of program
async function promptUser() {
  return inquirer
    .prompt(questions)
    .then(async (answers) => {
      switch (answers.action) {
        case "View All Products":
          sqlFunctions.getAllProducts().then((result) => {
            if (result.rows.length !== 0) {
              console.log("\n");
              console.table(result.rows);
              console.log(chalk.blue("Displayed all products."));
              addActionPrompt();
            } else {
              console.log(chalk.yellow("No products found in the inventory."));
              addActionPrompt();
            }
          });
          break;
        case "View Low Inventory":
          sqlFunctions.getLowInventory().then((result) => {
            if (result.rows.length === 0) {
              console.log("\n");
              console.log(chalk.yellow("No products with low inventory."));
              addActionPrompt();
            } else {
              console.log("\n");
              console.table(result.rows);
              console.log(chalk.blue("Displayed low inventory products."));
              addActionPrompt();
            }
          });
          break;
        case "View All Suppliers":
          sqlFunctions.getAllSuppliers().then((result) => {
            console.log("\n");
            console.table(result.rows);
            console.log(chalk.blue("Displayed all suppliers."));
            addActionPrompt();
          });
          break;
        case "Add Product":
          await inquirer.prompt(addProductQuestions).then((productAnswers) => {
            sqlFunctions
              .addProduct(
                productAnswers.addProductName,
                productAnswers.addProductCategory,
                productAnswers.addProductPrice,
                productAnswers.addProductStock,
                productAnswers.addProductSupplier,
              )
              .then((result) => {
                console.log(chalk.green("\n", result));
                console.log(chalk.blue("Product added successfully."));
                addActionPrompt();
              });
          });
          break;
        case "Add Supplier":
          await inquirer
            .prompt(addSupplierQuestions)
            .then((supplierAnswers) => {
              sqlFunctions
                .addSupplier(
                  supplierAnswers.addSupplierName,
                  supplierAnswers.addSupplierContact,
                  supplierAnswers.addSupplierPhone,
                )
                .then((result) => {
                  console.log(chalk.green("\n", result));
                  console.log(chalk.blue("Supplier added successfully."));
                  addActionPrompt();
                });
            });
          break;
        case "Exit":
          console.log(chalk.red("Exiting the application."));
          process.exit(0);
        default:
          console.log("\n");
          console.log("Action not implemented yet.");
          addActionPrompt();
          break;
      }
      return promptUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default promptUser;
