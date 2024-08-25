import { Module } from '@nestjs/common';
import { CommonsService } from './commons.service';
import { CommonsController } from './commons.controller';
import { SchemaModule } from 'src/cores/__schema__/schema.module';

@Module({
    imports: [SchemaModule],
    controllers: [CommonsController],
    providers: [CommonsService],
})
export class CommonsModule {}
