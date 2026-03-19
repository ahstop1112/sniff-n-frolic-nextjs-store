import { Inject, Injectable } from "@nestjs/common";
import type { Pool } from "pg";
import { PG_POOL } from "../../database/database.module";

@Injectable()
export class HealthService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async testDb() {
    const result = await this.pool.query("SELECT NOW()");
    return result.rows;
  }
}

