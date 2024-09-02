import { Injectable } from "@nestjs/common";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";

@Injectable()
export class RelationsService {
    constructor(private dataService: AbstractDataServices) {}
}
