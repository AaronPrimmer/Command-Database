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
    type: "list",
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
    type: "list",
    name: "addProductSupplier",
    message: "Select the supplier for this product:",
    choices: () => {
      const result = sqlFunctions.getAllSuppliersNames();
      return result.rows.map((supplier) => supplier.name);
    },
  },
];

function addActionPrompt() {
  console.log(chalk.green("\n\n\n\nSelect another action."));
}

function promptUser() {
  return inquirer
    .prompt(questions)
    .then((answers) => {
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
              console.log(
                "\n",
                chalk.yellow("No products with low inventory."),
              );
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

export { promptUser };
