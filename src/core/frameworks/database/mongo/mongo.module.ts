import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EntitiesTypesSchema } from "src/core/entities/entities_types.schema";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { RoleSchema } from "src/core/entities/role.schema";
import { UserSchema } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";
import { MongoServices } from "./mongo.services";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION_NAME.USER, schema: UserSchema },
            { name: COLLECTION_NAME.ROLE, schema: RoleSchema },
            { name: COLLECTION_NAME.ENTITIES_TYPE, schema: EntitiesTypesSchema },
        ]),
    ],
    providers: [
        {
            provide: AbstractDataServices,
            useClass: MongoServices,
        },
    ],
    exports: [AbstractDataServices],
})
export class MongoModule {}
