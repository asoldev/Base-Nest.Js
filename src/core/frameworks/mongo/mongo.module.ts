import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDataServices } from "./mongo.services";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { RoleSchema } from "src/core/entities/role.schema";
import { UserSchema } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION_NAME.USER, schema: UserSchema },
            { name: COLLECTION_NAME.ROLE, schema: RoleSchema },
        ]),
    ],
    providers: [
        {
            provide: AbstractDataServices,
            useClass: MongoDataServices,
        },
    ],
    exports: [AbstractDataServices],
})
export class MongoDataServicesModule {}
