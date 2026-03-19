import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { ProductSyncService } from "../modules/sync/product-sync.service";

const run = async () => {
  let appContext: any;
  try {
    appContext = await NestFactory.createApplicationContext(AppModule);
    const syncService = appContext.get(ProductSyncService);
    const totalImported = await syncService.syncAllProducts();

    // eslint-disable-next-line no-console
    console.log(`Import complete. Total imported: ${totalImported}`);
    await appContext.close();
    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Import failed:", error);
    if (appContext?.close) await appContext.close();
    process.exit(1);
  }
};

run();