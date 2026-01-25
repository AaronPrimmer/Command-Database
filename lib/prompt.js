import inquirer from "inquirer";
import chalk from "chalk";
import sqlFunctions from "./sql.js";

let updateProductDetails = {};

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

// Restock questions
const restockQuestions = [
  {
    type: "input",
    name: "restockProductId",
    message: "Enter the product ID to restock:",
    validate: async (input) => {
      const value = parseInt(input, 10);
      if (Number.isInteger(value) && value > 0) {
        const productExists = await sqlFunctions.getOneProduct(value);
        if (productExists) {
          console.log("\n", chalk.green("Product found."));
          console.log(
            "Product:",
            chalk.yellow(productExists.name),
            "Current Quantity:",
            chalk.green(productExists.quantity),
          );
          return true;
        } else {
          return "Product does not exist. Please enter a valid product ID.";
        }
      }
    },
  },
  {
    type: "input",
    name: "restockQuantity",
    message: "Enter the quantity to add to stock:",
    validate: (input) => {
      const value = parseInt(input, 10);
      return (
        (Number.isInteger(value) && value > 0) ||
        "Please enter a valid positive integer for restock quantity."
      );
    },
  },
];

// Record a sale questions
const recordSaleQuestions = [
  {
    type: "input",
    name: "saleProductId",
    message: "Enter the product ID sold:",
    validate: async (input) => {
      const value = parseInt(input, 10);
      if (Number.isInteger(value) && value > 0) {
        const productExists = await sqlFunctions.getOneProduct(value);
        if (productExists) {
          console.log("\n", chalk.green("Product found."));
          console.log(
            "Product:",
            chalk.yellow(productExists.name),
            "Current Quantity:",
            chalk.green(productExists.quantity),
          );
          return true;
        } else {
          return "Product does not exist. Please enter a valid product ID.";
        }
      }
    },
  },
  {
    type: "input",
    name: "saleQuantity",
    message: "Enter the quantity sold:",
    validate: (input) => {
      const value = parseInt(input, 10);
      return (
        (Number.isInteger(value) && value > 0) ||
        "Please enter a valid positive integer for sale quantity."
      );
    },
  },
];

// Update a product questions
const updateProductQuestions = [
  {
    type: "input",
    name: "updateProductId",
    message: "Enter the product ID update:",
    validate: async (input) => {
      const value = parseInt(input, 10);
      if (Number.isInteger(value) && value > 0) {
        const productExists = await sqlFunctions.getOneProduct(value);
        if (productExists) {
          updateProductDetails = {};
          updateProductDetails = { ...productExists };
          console.log("\n", chalk.green("Product found."));
          console.log(
            "Product:",
            chalk.yellow(productExists.name),
            "Current Quantity:",
            chalk.green(productExists.quantity),
          );
          return true;
        } else {
          return "Product does not exist. Please enter a valid product ID.";
        }
      }
    },
  },
  {
    type: "input",
    name: "updateProductName",
    message: `Enter the new product name:`,
    default: () => updateProductDetails.name,
    validate: (input) => input !== "" || "Product name cannot be empty.",
  },
  {
    type: "select",
    name: "updateProductSupplier",
    message: "Select the new product supplier:",
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
    default: async () => {
      const supplier = await sqlFunctions.getOneSupplier(
        updateProductDetails.supplier_id,
      );
      if (supplier) {
        return supplier.name;
      } else {
        return null;
      }
    },
  },
  {
    type: "input",
    name: "updateProductPrice",
    message: "Enter the new product price:",
    default: () => updateProductDetails.price,
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
    name: "updateProductStock",
    message: "Enter the new stock quantity:",
    default: () => updateProductDetails.quantity,
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
    name: "updateProductCategory",
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
    default: () => updateProductDetails.category,
  },
];

// Delete a product questions
const deleteProductQuestions = [
  {
    type: "input",
    name: "deleteProductId",
    message: "Enter the product ID to delete:",
    validate: async (input) => {
      const value = parseInt(input, 10);
      if (Number.isInteger(value) && value > 0) {
        const productExists = await sqlFunctions.getOneProduct(value);
        if (productExists) {
          console.log("\n", chalk.green("Product found."));
          console.log(
            "Product:",
            chalk.yellow(productExists.name),
            "Current Quantity:",
            chalk.green(productExists.quantity),
          );
          return true;
        } else {
          return "Product does not exist. Please enter a valid product ID.";
        }
      }
    },
  },
  {
    type: "confirm",
    name: "confirmDelete",
    message: "Are you sure you want to delete this product? Cannot be undone.",
    default: false,
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
              console.log(chalk.green("Displayed all products."));
            } else {
              console.log(chalk.yellow("No products found in the inventory."));
            }
          });
          addActionPrompt();
          break;
        case "View Low Inventory":
          sqlFunctions.getLowInventory().then((result) => {
            if (result.rows.length === 0) {
              console.log("\n");
              console.log(chalk.yellow("No products with low inventory."));
            } else {
              console.log("\n");
              console.table(result.rows);
              console.log(chalk.green("Displayed low inventory products."));
            }
          });
          addActionPrompt();
          break;
        case "View All Suppliers":
          sqlFunctions.getAllSuppliers().then((result) => {
            console.log("\n");
            console.table(result.rows);
            console.log(chalk.green("Displayed all suppliers."));
          });
          addActionPrompt();
          break;
        case "Add Product":
          await inquirer.prompt(addProductQuestions).then((productAnswers) => {
            sqlFunctions.addProduct(
              productAnswers.addProductName,
              productAnswers.addProductCategory,
              productAnswers.addProductPrice,
              productAnswers.addProductStock,
              productAnswers.addProductSupplier,
            );
            console.log("\n");
            console.log(chalk.green("Product added successfully."));
          });
          addActionPrompt();
          break;
        case "Add Supplier":
          await inquirer
            .prompt(addSupplierQuestions)
            .then((supplierAnswers) => {
              sqlFunctions.addSupplier(
                supplierAnswers.addSupplierName,
                supplierAnswers.addSupplierContact,
                supplierAnswers.addSupplierPhone,
              );
              console.log("\n");
              console.log(chalk.green("Supplier added successfully."));
            });
          addActionPrompt();
          break;
        case "Restock Product":
          let quantityAdded = 0;
          await inquirer.prompt(restockQuestions).then((restockAnswers) => {
            quantityAdded = restockAnswers.restockQuantity;
            sqlFunctions.restockProduct(
              restockAnswers.restockProductId,
              restockAnswers.restockQuantity,
            );
          });
          console.log("\n");
          console.log(
            chalk.green(
              `Product restocked successfully. Added ${quantityAdded} units.`,
            ),
          );
          addActionPrompt();
          break;
        case "Record Sale":
          let quantitySold = 0;
          await inquirer.prompt(recordSaleQuestions).then((saleAnswers) => {
            quantitySold = saleAnswers.saleQuantity;
            sqlFunctions.recordSale(saleAnswers.saleProductId, quantitySold);
          });
          console.log("\n");
          console.log(
            chalk.green(
              `Sold ${quantitySold} units.  Quantity updated successfully.`,
            ),
          );
          addActionPrompt();
          break;
        case "Update Product":
          await inquirer
            .prompt(updateProductQuestions)
            .then((updateAnswers) => {
              sqlFunctions.updateProduct(
                updateAnswers.updateProductId,
                updateAnswers.updateProductName,
                updateAnswers.updateProductCategory,
                updateAnswers.updateProductPrice,
                updateAnswers.updateProductStock,
                updateAnswers.updateProductSupplier,
              );
              console.log("\n");
              console.log(chalk.green("Product updated successfully."));
            });
          addActionPrompt();
          break;
        case "Delete Product":
          await inquirer
            .prompt(deleteProductQuestions)
            .then((deleteAnswers) => {
              if (deleteAnswers.confirmDelete) {
                const deleted = sqlFunctions.deleteProduct(
                  deleteAnswers.deleteProductId,
                  deleteAnswers.confirmDelete,
                );
                if (deleted) {
                  console.log("\n");
                  console.log(chalk.green("Product deleted successfully."));
                } else {
                  console.log("\n");
                  console.log(chalk.red("Product deletion failed."));
                }
              }
            });
          addActionPrompt();
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
