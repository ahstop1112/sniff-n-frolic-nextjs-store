import { Module } from "@nestjs/common";
import { pool } from "../config/db";

export const PG_POOL = Symbol("PG_POOL");

@Module({
  providers: [{ provide: PG_POOL, useValue: pool }],
  exports: [PG_POOL],
})
export class DatabaseModule {}

