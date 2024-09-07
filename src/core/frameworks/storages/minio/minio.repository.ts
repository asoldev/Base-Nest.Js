import { Injectable } from "@nestjs/common";

import * as Minio from "minio";
import { UploadedObjectInfo } from "minio/dist/main/internal/type";
import {
    AbstractStorageService,
    ParamsCreateBucket,
    ParamsGetObject,
    paramsPutObject,
} from "src/modules/abstraction/storage-service.abstract";
import internal from "stream";

@Injectable()
export class MinioRepository implements AbstractStorageService {
    private _repository: Minio.Client;
    constructor(repository: Minio.Client) {
        this._repository = repository;
    }

    async putObject(params: paramsPutObject): Promise<UploadedObjectInfo> {
        const { bucketName, objectName, stream, size, metaData } = params;
        return this._repository.putObject(bucketName, objectName, stream, size, metaData);
    }

    async getObject(params: ParamsGetObject): Promise<internal.Readable> {
        const { bucketName, objectName, getOpts } = params;
        return this._repository.getObject(bucketName, objectName, getOpts);
    }

    createBucket(params: ParamsCreateBucket): Promise<void> {
        const { bucketName, makeOpts, region } = params;
        const bucketExists = this.bucketExists(bucketName);
        if (bucketExists) {
            console.log("Bucket exists according to Minio");
            return;
        }
        return this._repository.makeBucket(bucketName, region, makeOpts);
    }

    listBuckets(): Promise<Minio.BucketItemFromList[]> {
        return this._repository.listBuckets();
    }

    bucketExists(bucketName: string): Promise<boolean> {
        return this._repository.bucketExists(bucketName);
    }

    removeBucket(bucketName: string): Promise<void> {
        return this._repository.removeBucket(bucketName);
    }
}
