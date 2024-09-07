import { DeleteResult } from "mongodb";
import {
    FilterQuery,
    InsertManyOptions,
    InsertManyResult,
    ObjectId,
    PopulateOptions,
    ProjectionType,
    QueryOptions,
    SortOrder,
    Types,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    UpdateWriteOpResult,
} from "mongoose";

// Define the response type for findAll method
export type PaginationDto<T> = {
    count: number;
    documents: T[];
    totalPage: number;
    limit: number;
    currentPage: number;
};

// Define the repository service interface
export abstract class AbstractRepositoryService<T> {
    /**
     * Finds all documents matching the filter with optional pagination, sorting, and projection.
     * @param filter - Query filter.
     * @param projection - Fields to include or exclude in the result.
     * @param skip - Number of documents to skip (for pagination).
     * @param limit - Maximum number of documents to return.
     * @param sort - Sorting order or field specification.
     * @param options - Additional query options.
     * @returns A promise that resolves with the response containing the count and items.
     */
    abstract findAll(
        filter: FilterQuery<T>,
        projection?: ProjectionType<T>,
        skip?: number,
        limit?: number,
        sort?: string | { [key: string]: SortOrder } | [string, SortOrder][],
        population?: PopulateOptions[],
        options?: QueryOptions
    ): Promise<PaginationDto<T>>;

    /**
     * Finds a document by its ID.
     * @param id - Document ID.
     * @param projection - Fields to include or exclude in the result.
     * @param options - Additional query options.
     * @returns A promise that resolves with the found document or null if not found.
     */
    abstract findOneById(
        id: Types.ObjectId,
        population?: PopulateOptions[],
        projection?: ProjectionType<T>,
        options?: QueryOptions
    ): Promise<T | null>;

    /**
     * Finds a single document matching the filter.
     * @param filter - Query filter.
     * @param projection - Fields to include or exclude in the result.
     * @param options - Additional query options.
     * @returns A promise that resolves with the found document or null if not found.
     */
    abstract findOne(
        filter: FilterQuery<T>,
        population?: PopulateOptions[],
        projection?: ProjectionType<T>,
        options?: QueryOptions
    ): Promise<T | null>;

    /**
     * Inserts a single document into the collection.
     *
     * @param item - The document to insert. Must match the type Partial<T>.
     * @param options - Optional query options.
     * @returns A promise that resolves to the inserted document.
     */
    abstract insertOne(item: Partial<T>, options?: QueryOptions): Promise<T>;

    /**
     * Inserts multiple documents into the collection.
     *
     * @param items - An array of documents to insert. Each document must match the type T.
     * @param options - Optional configuration for the insertion:
     *   - `lean: true` to return plain JavaScript objects rather than Mongoose documents.
     * @returns A promise that resolves to either an array of inserted documents or the raw result from MongoDB.
     */
    abstract insertMany(
        items: T[],
        options?: InsertManyOptions & {
            lean: true;
        }
    ): Promise<T[] | InsertManyResult<T>>;
    /**
     * Updates a document by its ID.
     * @param id - Document ID.
     * @param update - Update operations.
     * @param options - Additional query options.
     * @returns A promise that resolves with the updated document or null if not found.
     */

    /**
     * Updates a document by its ID.
     * @param id - Document ID.
     * @param update - Update operations.
     * @param options - Additional query options.
     * @returns A promise that resolves with the updated document or null if not found.
     */
    abstract updateOne(
        id: Types.ObjectId,
        update: UpdateQuery<T> | UpdateWithAggregationPipeline,
        options?: QueryOptions
    ): Promise<T | null>;

    /**
     * Updates multiple documents matching the filter.
     * @param filter - Query filter.
     * @param update - Update operations.
     * @returns A promise that resolves with the result of the update operation.
     */
    abstract updateMany(
        filter: FilterQuery<T>,
        update: UpdateQuery<T> | UpdateWithAggregationPipeline
    ): Promise<UpdateWriteOpResult>;

    /**
     * Deletes a single document by its ID.
     *
     * @param id - The ID of the document to delete. Must be a valid ObjectId.
     * @param hard - A boolean indicating whether the deletion is hard (permanent) or soft (mark as deleted).
     * @returns A promise that resolves with the deleted document if found, or null if no document was found.
     */
    abstract deleteOne(id: Types.ObjectId, hard: boolean): Promise<T | null>;

    /**
     * Deletes multiple documents matching the filter.
     *
     * @param filter - The query filter to match documents for deletion. Must match the type T.
     * @param hard - A boolean indicating whether the deletion is hard (permanent) or soft (mark as deleted).
     * @returns A promise that resolves with the result of the delete operation, which may include the number of documents deleted.
     */
    abstract deleteMany(filter: FilterQuery<T>, hard: boolean): Promise<UpdateWriteOpResult | DeleteResult>;

    /**
     * Restores a soft-deleted document by its ID (sets is_active to true).
     * @param id - Document ID.
     * @returns A promise that resolves with the restored document or null if not found.
     */
    abstract restoreOne(id: ObjectId): Promise<T | null>;

    /**
     * Restores multiple soft-deleted documents matching the filter (sets is_active to true).
     * @param filter - Query filter.
     * @returns A promise that resolves with the result of the restore operation.
     */
    abstract restoreMany(filter: FilterQuery<T>): Promise<UpdateWriteOpResult>;
}
