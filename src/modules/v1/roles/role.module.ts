import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/frameworks/database/data-services.module";
import { StorageServicesModule } from "src/core/frameworks/storages/storage-services.module";
import { RolesController } from "./controllers/roles.controller";
import { RolesService } from "./services/role.service";

@Module({
    imports: [DataServicesModule, StorageServicesModule],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RoleModule {}
