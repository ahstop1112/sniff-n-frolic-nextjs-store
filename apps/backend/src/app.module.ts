import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./modules/health/health.module";
import { ProductsModule } from "./modules/products/products.module";
import { WooModule } from "./modules/woo/woo.module";
import { SyncModule } from "./modules/sync/sync.module";

@Module({
  imports: [DatabaseModule, HealthModule, ProductsModule, WooModule, SyncModule],
})
export class AppModule {}

