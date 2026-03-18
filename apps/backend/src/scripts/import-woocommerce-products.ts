import dotenv from "dotenv";
dotenv.config();

import { pool } from "../config/db";
import { fetchWooProducts } from "../services/woo.services";

const upsertProduct = async (product: any) => {
  await pool.query(
    `INSERT INTO products (
      woo_product_id,
      slug,
      name,
      short_description,
      description,
      sku,
      product_type,
      status,
      featured,
      price,
      regular_price,
      sale_price,
      stock_status,
      stock_quantity,
      manage_stock,
      featured_image_url,
      woo_created_at,
      woo_updated_at,
      synced_at
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15, $16,
      $17, $18, NOW()
    )
    ON CONFLICT (woo_product_id)
    DO UPDATE SET
      slug = EXCLUDED.slug,
      name = EXCLUDED.name,
      short_description = EXCLUDED.short_description,
      description = EXCLUDED.description,
      sku = EXCLUDED.sku,
      product_type = EXCLUDED.product_type,
      status = EXCLUDED.status,
      featured = EXCLUDED.featured,
      price = EXCLUDED.price,
      regular_price = EXCLUDED.regular_price,
      sale_price = EXCLUDED.sale_price,
      stock_status = EXCLUDED.stock_status,
      stock_quantity = EXCLUDED.stock_quantity,
      manage_stock = EXCLUDED.manage_stock,
      featured_image_url = EXCLUDED.featured_image_url,
      woo_created_at = EXCLUDED.woo_created_at,
      woo_updated_at = EXCLUDED.woo_updated_at,
      synced_at = NOW()
    `,
    [
      product.id,
      product.slug,
      product.name,
      product.short_description || null,
      product.description || null,
      product.sku || null,
      product.type || "simple",
      product.status || "draft",
      Boolean(product.featured),
      product.price ? Number(product.price) : null,
      product.regular_price ? Number(product.regular_price) : null,
      product.sale_price ? Number(product.sale_price) : null,
      product.stock_status || null,
      product.stock_quantity ?? null,
      Boolean(product.manage_stock),
      product.images?.[0]?.src || null,
      product.date_created ? new Date(product.date_created) : null,
      product.date_modified ? new Date(product.date_modified) : null,
    ]
  );
};

const run = async () => {
  try {
    let page = 1;
    let totalImported = 0;

    while (true) {
      const products = await fetchWooProducts(page);

      if (!products.length) {
        break;
      }

      for (const product of products) {
        await upsertProduct(product);
      }

      totalImported += products.length;
      console.log(`Imported page ${page}: ${products.length} products`);
      page += 1;
    }

    console.log(`Import complete. Total imported: ${totalImported}`);
    process.exit(0);
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
};

run();