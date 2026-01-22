import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// returns all the products from the table
export function getAllProducts() {
  return pool.query("SELECT * FROM products ORDER BY id ASC");
}

// returns all products with stock quantity below the threshold
export function getLowInventory(threshold = 10) {
  return pool.query(
    "SELECT * FROM products WHERE quantity < $1 ORDER BY id ASC",
    [threshold],
  );
}

// returns all the suppliers from the table
export async function getAllSuppliers() {
  const result = await pool.query("SELECT * FROM suppliers ORDER BY id ASC");
  return result.rows;
}

// returns all the suppliers names from the table
export function getAllSuppliersNames() {
  return pool.query("SELECT name FROM suppliers ORDER BY name ASC");
}

// adds a new product to the products table
export async function addProduct(
  name,
  category,
  price,
  stockQuantity,
  supplierName,
) {
  const result = await pool
    .query("SELECT id FROM suppliers WHERE name = $1 LIMIT 1", [supplierName])
    .catch((error) => {
      console.error("Error fetching supplier ID:", error);
    });

  try {
    return await pool.query(
      "INSERT INTO products (name, category, price, quantity, supplier_id) VALUES ($1, $2, $3, $4, $5)",
      [name, category, price, stockQuantity, result.rows[0].id],
    );
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

export default {
  getAllProducts,
  getLowInventory,
  getAllSuppliers,
  getAllSuppliersNames,
  addProduct,
};
