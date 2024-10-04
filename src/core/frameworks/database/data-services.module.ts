import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { MongoModule } from "./mongo/mongo.module";

@Module({
  imports: [MongoModule],
  exports: [MongoModule],
})
export class DataServicesModule {}
