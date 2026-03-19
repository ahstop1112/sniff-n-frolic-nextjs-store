import { Inject, Injectable } from "@nestjs/common";
import type { Pool } from "pg";
import { PG_POOL } from "../../database/database.module";

@Injectable()
export class ProductsService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async getProducts() {
    const result = await this.pool.query(`
      SELECT
        id,
        woo_product_id,
        slug,
        name,
        price,
        featured_image_url,
        stock_status
      FROM products
      ORDER BY id DESC
    `);

    return result.rows;
  }
}

