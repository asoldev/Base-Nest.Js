import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/frameworks/database/data-services.module";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { RelationsService } from "../relations.service";

@Module({
    imports: [DataServicesModule],
    controllers: [UsersController],
    providers: [UsersService, RelationsService],
})
export class UsersModule {}
