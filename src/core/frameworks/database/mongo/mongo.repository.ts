import { AqpQuery } from "api-query-params";
import { DeleteResult, MongoError } from "mongodb";
import {
    FilterQuery,
    InsertManyOptions,
    Model,
    ObjectId,
    ProjectionType,
    QueryOptions,
    Types,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    UpdateWriteOpResult,
} from "mongoose";
import { AbstractRepository, PaginationDto } from "src/modules/abstracts/repository.abstract";

export class MongoRepository<T> implements AbstractRepository<T> {
    private _repository: Model<T>;
    constructor(repository: Model<T>) {
        this._repository = repository;
    }

    private async getCount(filter: FilterQuery<T>): Promise<number> {
        return this._repository.countDocuments(filter).exec();
    }

    public async findAll(params: AqpQuery, options?: QueryOptions): Promise<PaginationDto<T>> {
        const { filter, limit, population, projection, skip, sort } = params;

        try {
            const [documents, count] = await Promise.all([
                this._repository
                    .find(filter, projection, options)
                    .skip(skip)
                    .limit(limit)
                    .sort(sort as any)
                    .populate(population)
                    .exec(),
                this.getCount(filter),
            ]);

            const totalPage = Math.ceil(count / limit);
            return { documents, count, limit, currentPage: skip, totalPage };
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async findOneById(
        id: Types.ObjectId,
        projection?: ProjectionType<T>,
        options?: QueryOptions
    ): Promise<T | null> {
        try {
            return this._repository.findById(id, projection, options).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async findOne(
        filter: FilterQuery<T>,
        projection?: ProjectionType<T>,
        options?: QueryOptions
    ): Promise<T | null> {
        try {
            return this._repository.findOne(filter, projection, options).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async insertOne(item: T, options?: QueryOptions): Promise<T> {
        const document = new this._repository(item);
        try {
            return document.save(options) as T;
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async insertMany(items: T[], options?: InsertManyOptions & { lean: true }) {
        try {
            return this._repository.insertMany(items, options);
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async updateOne(
        id: Types.ObjectId,
        update: UpdateQuery<T> | UpdateWithAggregationPipeline,
        options?: QueryOptions
    ): Promise<T | null> {
        try {
            return this._repository.findByIdAndUpdate(id, update, { new: true, ...options }).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async updateMany(
        filter: FilterQuery<T>,
        update: UpdateQuery<T> | UpdateWithAggregationPipeline
    ): Promise<UpdateWriteOpResult> {
        try {
            return this._repository.updateMany(filter, update).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async deleteOne(id: Types.ObjectId, hard: boolean = false): Promise<T | null> {
        try {
            if (hard) {
                return this._repository.findByIdAndDelete(id).exec();
            } else {
                return this._repository.findByIdAndUpdate(id, { is_active: false }, { new: true }).exec();
            }
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async deleteMany(
        filter: FilterQuery<T>,
        hard: boolean = false
    ): Promise<UpdateWriteOpResult | DeleteResult> {
        try {
            if (hard) {
                return this._repository.deleteMany(filter).exec();
            } else {
                return this._repository.updateMany(filter, { is_active: false }).exec();
            }
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async restoreOne(id: ObjectId): Promise<T | null> {
        try {
            return this._repository.findByIdAndUpdate(id, { is_active: true }, { new: true }).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }

    public async restoreMany(filter: FilterQuery<T>): Promise<UpdateWriteOpResult> {
        try {
            return this._repository.updateMany(filter, { is_active: true }).exec();
        } catch (error) {
            throw new MongoError(error);
        }
    }
}
