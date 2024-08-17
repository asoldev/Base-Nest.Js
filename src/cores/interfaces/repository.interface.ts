import { DeleteResult } from 'mongodb';
import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  SortOrder,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';

// Define the response type for findAll method
export type FindAllResponse<T> = {
  count: number;
  items: T[];
};

// Define the repository service interface
export interface IRepositoryService<T> {
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
  findAll(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    skip?: number,
    limit?: number,
    sort?: string | { [key: string]: SortOrder } | [string, SortOrder][],
    options?: QueryOptions,
  ): Promise<FindAllResponse<T>>;

  /**
   * Finds a document by its ID.
   * @param id - Document ID.
   * @param projection - Fields to include or exclude in the result.
   * @param options - Additional query options.
   * @returns A promise that resolves with the found document or null if not found.
   */
  findOneById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Finds a single document matching the filter.
   * @param filter - Query filter.
   * @param projection - Fields to include or exclude in the result.
   * @param options - Additional query options.
   * @returns A promise that resolves with the found document or null if not found.
   */
  findOneByFilter(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Updates a document by its ID.
   * @param id - Document ID.
   * @param update - Update operations.
   * @param options - Additional query options.
   * @returns A promise that resolves with the updated document or null if not found.
   */
  updateOne(
    id: string,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Updates multiple documents matching the filter.
   * @param filter - Query filter.
   * @param update - Update operations.
   * @returns A promise that resolves with the result of the update operation.
   */
  updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
  ): Promise<UpdateWriteOpResult>;

  /**
   * Updates a document by its ID.
   * @param id - Document ID.
   * @param update - Update operations.
   * @param options - Additional query options.
   * @returns A promise that resolves with the updated document or null if not found.
   */
  deleteOne(id: string, hard: boolean): Promise<T | null>;

  /**
   * Updates multiple documents matching the filter.
   * @param filter - Query filter.
   * @param update - Update operations.
   * @returns A promise that resolves with the result of the update operation.
   */
  deleteMany(
    filter: FilterQuery<T>,
    hard: boolean,
  ): Promise<UpdateWriteOpResult | DeleteResult>;

  /**
   * Restores a soft-deleted document by its ID (sets is_active to true).
   * @param id - Document ID.
   * @returns A promise that resolves with the restored document or null if not found.
   */
  restoreOne(id: string): Promise<T | null>;

  /**
   * Restores multiple soft-deleted documents matching the filter (sets is_active to true).
   * @param filter - Query filter.
   * @returns A promise that resolves with the result of the restore operation.
   */
  restoreMany(filter: FilterQuery<T>): Promise<UpdateWriteOpResult>;
}
