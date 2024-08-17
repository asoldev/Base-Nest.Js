import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../../cores/services/repository.service';
import { Permissions } from '../../../cores/__schema__/permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService extends RepositoryService<Permissions> {
  constructor(
    @InjectModel(Permissions.name) permissionsModel: Model<Permissions>,
  ) {
    super(permissionsModel);
  }
}
