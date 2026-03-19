import { Module } from "@nestjs/common";
import { WooModule } from "../woo/woo.module";
import { ProductSyncService } from "./product-sync.service";

@Module({
  imports: [WooModule],
  providers: [ProductSyncService],
})
export class SyncModule {}

