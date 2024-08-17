import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../../cores/services/repository.service';
import { Role } from '../../../cores/__schema__/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleService extends RepositoryService<Role> {
  constructor(@InjectModel(Role.name) roleModel: Model<Role>) {
    super(roleModel);
  }
}
