import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { DataServicesModule } from "src/core/frameworks/database/data-services.module";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";

@Module({
  imports: [DataServicesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
