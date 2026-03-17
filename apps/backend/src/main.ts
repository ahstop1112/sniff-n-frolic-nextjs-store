import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { pool } from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/test-db", async (req, res) => {
  console.log(pool);
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/products", async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, woo_product_id, slug, name, price, featured_image_url, stock_status
      FROM products
      ORDER BY id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});