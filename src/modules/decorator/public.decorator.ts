import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(IsPublic.name, true);
