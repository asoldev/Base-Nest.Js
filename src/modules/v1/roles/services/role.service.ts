import { Injectable } from "@nestjs/common";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";
import { AbstractStorageService } from "src/modules/abstracts/storage-service.abstract";

@Injectable()
export class RolesService {
    constructor(
        public dataService: AbstractDataServices,
        public storageService: AbstractStorageService
    ) {}
}
