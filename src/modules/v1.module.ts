import { Module } from "@nestjs/common";
import { RoleModule } from "./v1/roles/role.module";

@Module({
    imports: [RoleModule],
})
export class V1Module {}
