import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get("health")
  health() {
    return "OK";
  }

  @Get("test-db")
  async testDb() {
    return this.healthService.testDb();
  }
}

