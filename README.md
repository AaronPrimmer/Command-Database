# Inventory Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)

A command-line inventory database management system built with Node.js and PostgreSQL. This application provides an interactive interface for managing products, suppliers, and inventory operations.

## Video Walkthrough

[![Aaron's Week 12 Homework Walkthrough](https://img.youtube.com/vi/Y3_tUO2LgfY/0.jpg)](https://www.youtube.com/watch?v=Y3_tUO2LgfY)

## Features

- **View All Products** - Display complete product catalog
- **View Low Inventory** - Identify products that need restocking
- **View All Suppliers** - Browse supplier directory
- **Add Product** - Register new products in the system
- **Add Supplier** - Add new supplier information
- **Restock Product** - Update inventory quantities
- **Record Sale** - Process and track product sales
- **Update Product** - Modify existing product details
- **Delete Product** - Remove products from the database

## Technologies

- **Node.js** - Runtime environment
- **Express** - API and Routing Management
- **PostgreSQL** - Database management system
- **Inquirer.js** - Interactive command-line interface
- **Chalk** - Terminal styling and colors
- **pg** - PostgreSQL client for Node.js

## Prerequisites

Before running this application, ensure you have:

- Node.js (v20 or higher)
- PostgreSQL installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AaronPrimmer/Command-Database.git
cd command-database
```

2. Install dependencies:

```bash
npm install
```

3. Set up your PostgreSQL database using the sql files

4. Configure database connection:
   - Create a `.env` file in the root directory
   - Add your PostgreSQL credentials:

```
DB_USER=your_username
DB_HOST=localhost
DB_NAME=database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

## Usage

Start the application:

```bash
node databaseCommand.js
```

Navigate through the menu using arrow keys and follow the prompts to manage your inventory.

## Database Schema

The application uses a PostgreSQL database with tables for products and suppliers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

**Aaron Primmer**

- GitHub: [@AaronPrimmer](https://github.com/AaronPrimmer)
- Email: aaronmprimmer@gmail.com

## Acknowledgments

Built with Inquirer.js for interactive prompts, Chalk for colorful terminal output, and PostgreSQL for robust data management.
