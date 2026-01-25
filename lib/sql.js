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
  return await pool.query("SELECT * FROM suppliers ORDER BY id ASC");
}

// returns all the suppliers names from the table
export function getAllSuppliersNames() {
  return pool.query("SELECT name FROM suppliers ORDER BY name ASC");
}

//Checks to see if supplier exists
export async function checkSupplierExists(supplierName) {
  const result = await pool.query(
    "SELECT COUNT(*) FROM suppliers WHERE name = $1",
    [supplierName],
  );
  //console.log(result.rows);
  return parseInt(result.rows[0].count, 10) > 0;
}

// Gets one supplier by id
export async function getOneSupplier(id) {
  const result = await pool.query("SELECT * FROM suppliers WHERE id = $1", [
    id,
  ]);
  if (result.rows.length === 1) {
    return result.rows[0];
  } else {
    return false;
  }
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

// Adds supplier to the suppliers table
export async function addSupplier(name, email, phone) {
  return await pool.query(
    "INSERT INTO suppliers (name, email, phone) VALUES ($1, $2, $3)",
    [name, email, phone],
  );
}

// Restocks a product by updating its quantity
export async function restockProduct(productId, additionalQuantity) {
  return await pool.query(
    "UPDATE products SET quantity = quantity + $1 WHERE id = $2",
    [additionalQuantity, productId],
  );
}

// Check if one prdoduct exists by ID
export async function getOneProduct(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  if (result.rows.length === 1) {
    return result.rows[0];
  } else {
    return false;
  }
}

// Records a sale of a product by ID, reducing product quantity
export async function recordSale(productId, quantitySold) {
  return await pool.query(
    "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
    [quantitySold, productId],
  );
}

// Updates product details
export async function updateProduct(
  productId,
  name,
  category,
  price,
  quantity,
  supplierName,
) {
  const result = await pool
    .query("SELECT id FROM suppliers WHERE name = $1 LIMIT 1", [supplierName])
    .catch((error) => {
      console.error("Error fetching supplier ID:", error);
    });

  try {
    return await pool.query(
      "UPDATE products SET name = $1, category = $2, price = $3, quantity = $4, supplier_id = $5 WHERE id = $6",
      [name, category, price, quantity, result.rows[0].id, productId],
    );
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

// Delete a product by ID
export async function deleteProduct(productId, confirmDelete) {
  try {
    if (!confirmDelete) {
      throw new Error("Product deletion not confirmed.");
    }
    return await pool.query("DELETE FROM products WHERE id = $1", [productId]);
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

export default {
  getAllProducts,
  getLowInventory,
  getAllSuppliers,
  getAllSuppliersNames,
  checkSupplierExists,
  addSupplier,
  addProduct,
  getOneProduct,
  restockProduct,
  recordSale,
  getOneSupplier,
  updateProduct,
  deleteProduct,
};
