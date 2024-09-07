import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesSchema } from "src/core/entities/categories.schema";
import { ChannelSchema } from "src/core/entities/channel.schema";
import { EntitiesTypesSchema } from "src/core/entities/entities_types.schema";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { PostsSchema } from "src/core/entities/posts.schema";
import { RoleSchema } from "src/core/entities/role.schema";
import { TagsSchema } from "src/core/entities/tag.schema";
import { UserSchema } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";
import { MongoServices } from "./mongo.services";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION_NAME.USER, schema: UserSchema },
            { name: COLLECTION_NAME.ROLE, schema: RoleSchema },
            { name: COLLECTION_NAME.ENTITIES_TYPE, schema: EntitiesTypesSchema },
            { name: COLLECTION_NAME.CATEGORIES, schema: CategoriesSchema },
            { name: COLLECTION_NAME.CHANNEL, schema: ChannelSchema },
            { name: COLLECTION_NAME.POSTS, schema: PostsSchema },
            { name: COLLECTION_NAME.TAGS, schema: TagsSchema },
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
