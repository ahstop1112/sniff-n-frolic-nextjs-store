import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./modules/health/health.module";
import { ProductsModule } from "./modules/products/products.module";

@Module({
  imports: [DatabaseModule, HealthModule, ProductsModule],
})
export class AppModule {}

