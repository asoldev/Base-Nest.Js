import * as Minio from "minio";
import {
    GetObjectOpts,
    UploadedObjectInfo,
} from "minio/dist/main/internal/type";
import internal from "stream";

export type paramsPutObject = {
    bucketName: string;
    objectName: string;
    stream: internal.Readable | Buffer | string;
    size?: number;
    metaData?: Minio.ItemBucketMetadata;
};

export type ParamsGetObject = {
    bucketName: string;
    objectName: string;
    getOpts?: GetObjectOpts;
};

export type ParamsCreateBucket = {
    bucketName: string;
    region?: Minio.Region;
    makeOpts?: Minio.MakeBucketOpt;
};

/**
 * Abstract class representing a generic storage service.
 * This class defines the methods for interacting with storage repositories.
 */
export abstract class AbstractStorageService {
    /**
     * Uploads an object to the specified bucket.
     * @param params - Parameters required for uploading the object.
     * @param params.bucketName - The name of the bucket where the object will be uploaded.
     * @param params.objectName - The name of the object to be uploaded.
     * @param params.stream - The data stream of the object to be uploaded.
     * @param params.size - The size of the object being uploaded.
     * @param params.metaData - Metadata associated with the object.
     * @returns A promise that resolves to information about the uploaded object.
     */
    abstract putObject(params: paramsPutObject): Promise<UploadedObjectInfo>;

    /**
     * Retrieves an object from the specified bucket.
     * @param params - Parameters required for retrieving the object.
     * @param params.bucketName - The name of the bucket where the object is stored.
     * @param params.objectName - The name of the object to be retrieved.
     * @param params.getOpts - Options for getting the object.
     * @returns A promise that resolves to a readable stream of the object.
     */
    abstract getObject(params: ParamsGetObject): Promise<internal.Readable>;

    /**
     * Creates a new bucket with the specified options.
     * @param params - Parameters required for creating the bucket.
     * @param params.bucketName - The name of the bucket to be created.
     * @param params.makeOpts - Options for making the bucket.
     * @param params.region - The region where the bucket will be created.
     * @returns A promise that resolves when the bucket has been created.
     */
    abstract createBucket(params: ParamsCreateBucket): Promise<void>;

    /**
     * Lists all buckets available in the storage service.
     * @returns A promise that resolves to a list of buckets.
     */
    abstract listBuckets(): Promise<Minio.BucketItemFromList[]>;

    /**
     * Checks if a bucket with the specified name exists.
     * @param bucketName - The name of the bucket to check.
     * @returns A promise that resolves to a boolean indicating if the bucket exists.
     */
    abstract bucketExists(bucketName: string): Promise<boolean>;

    /**
     * Removes a bucket with the specified name.
     * @param bucketName - The name of the bucket to be removed.
     * @returns A promise that resolves when the bucket has been removed.
     */
    abstract removeBucket(bucketName: string): Promise<void>;
}
