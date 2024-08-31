import { Module } from "@nestjs/common";
import { RoleModule } from "./v1/roles/role.module";
import { UsersModule } from "./v1/users/users.module";

@Module({
    imports: [RoleModule, UsersModule],
})
export class V1Module {}
