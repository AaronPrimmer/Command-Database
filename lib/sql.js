import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export function getAllProducts() {
  return pool.query("SELECT * FROM products ORDER BY id ASC");
}

export function getLowInventory(threshold = 10) {
  return pool.query(
    "SELECT * FROM products WHERE quantity < $1 ORDER BY id ASC",
    [threshold],
  );
}

export function getAllSuppliers() {
  return pool.query("SELECT * FROM suppliers ORDER BY id ASC");
}

export function getAllSuppliersNames() {
  return pool.query("SELECT name FROM suppliers ORDER BY name ASC");
}

export function addProduct(name, category, price, stockQuantity, supplierName) {
  const result = pool.query(
    "SELECT supplier_id FROM suppliers WHERE name = $1 LIMIT 1",
    [supplierName],
  );

  return pool.query(
    "INSERT INTO products (name, category, price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4, $5)",
    [name, category, price, stockQuantity, result.row[0].supplier_id],
  );
}

export default {
  getAllProducts,
  getLowInventory,
  getAllSuppliers,
  getAllSuppliersNames,
  addProduct,
};
