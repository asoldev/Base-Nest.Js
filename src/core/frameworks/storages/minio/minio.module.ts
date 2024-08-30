import { Module } from "@nestjs/common";
import { AbstractStorageService } from "src/modules/abstracts/storage-service.abstract";
import { MinioService } from "./minio.services";

@Module({
    providers: [
        {
            provide: AbstractStorageService,
            useClass: MinioService,
        },
    ],
    exports: [AbstractStorageService],
})
export class MinioModule {}
