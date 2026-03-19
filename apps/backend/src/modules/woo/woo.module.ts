import { Module } from "@nestjs/common";
import { WooCommerceService } from "../../services/woo.services";

@Module({
  providers: [WooCommerceService],
  exports: [WooCommerceService],
})
export class WooModule {}

