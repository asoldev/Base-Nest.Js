import { Injectable } from "@nestjs/common";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";
import { AbstractStorageService } from "src/modules/abstraction/storage-service.abstract";

@Injectable()
export class RolesService {
    constructor(
        public dataService: AbstractDataServices,
        public storageService: AbstractStorageService
    ) {}
}
