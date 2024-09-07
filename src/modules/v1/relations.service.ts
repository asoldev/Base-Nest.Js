import { Injectable } from "@nestjs/common";
import { Categories } from "src/core/entities/categories.schema";
import { Posts } from "src/core/entities/posts.schema";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";

@Injectable()
export class RelationsService {
    constructor(public dataService: AbstractDataServices) {}

    async createRelation(mainDocument: Posts, dependDocuments: Categories[]) {
        await Promise.all([
            dependDocuments.map((document) =>
                this.dataService.categories.updateOne(document._id, {
                    $addToSet: {
                        relations_entities_types: mainDocument.entities_types,
                    },
                })
            ),
        ]);

        const getEntitiesTypesFields = mainDocument.relations.categories.map((document) => document.entities_types);
        return this.dataService.posts.updateOne(mainDocument._id, {
            $addToSet: {
                relations_entities_types: { $each: getEntitiesTypesFields },
            },
        });
    }

    async deleteRelation(mainDocument: Posts, dependDocuments: Categories[]) {
        const map = new Map();

        dependDocuments.forEach((document) => {
            const entry = map.get(document.entities_types.toString());
            map.set(document.entities_types.toString(), {
                numberDeleted: 0,
                totalDocuments: entry ? entry.totalDocuments++ : 1,
            });
        });

        await Promise.all([
            dependDocuments.map((document) => {
                const entry = map.get(document.entities_types.toString());
                if (entry) entry.numberDeleted++;
                return this.dataService.categories.updateOne(document._id, {
                    $pull: {
                        relations_entities_types: mainDocument.entities_types,
                    },
                });
            }),
        ]);
    }
}
