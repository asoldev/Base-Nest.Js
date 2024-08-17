import { DeleteResult } from 'mongodb';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';
import { ParsedQueryParams } from '../../modules/decorator/query.decorator';
import {
  FindAllResponse,
  IRepositoryService,
} from '../interfaces/repository.interface';

export class RepositoryService<T> implements IRepositoryService<T> {
  constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  private async getCount(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  public async findAll(
    params: ParsedQueryParams,
    options?: QueryOptions,
  ): Promise<FindAllResponse<T>> {
    const { filter, limit, populate, projection, skip, sort } = params;

    const [items, count] = await Promise.all([
      this.model
        .find(filter, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate(populate)
        .exec(),
      this.getCount(filter),
    ]);

    return { items, count };
  }

  public async findOneById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findById(id, projection, options).exec();
  }

  public async findOneByFilter(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public async updateOne(
    id: string,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, update, { new: true, ...options })
      .exec();
  }

  public async updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, update).exec();
  }

  public async deleteOne(id: string, hard: boolean = false): Promise<T | null> {
    if (hard) {
      return this.model.findByIdAndDelete(id).exec();
    } else {
      return this.model
        .findByIdAndUpdate(id, { is_active: false }, { new: true })
        .exec();
    }
  }

  public async deleteMany(
    filter: FilterQuery<T>,
    hard: boolean = false,
  ): Promise<UpdateWriteOpResult | DeleteResult> {
    if (hard) {
      return this.model.deleteMany(filter).exec();
    } else {
      return this.model.updateMany(filter, { is_active: false }).exec();
    }
  }

  public async restoreOne(id: string): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { is_active: true }, { new: true })
      .exec();
  }

  public async restoreMany(
    filter: FilterQuery<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, { is_active: true }).exec();
  }
}
