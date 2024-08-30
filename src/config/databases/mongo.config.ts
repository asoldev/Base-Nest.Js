import { ConfigService } from "@nestjs/config";

export const mongoConfig = {
    useFactory: async (configService: ConfigService) => {
        return {
            uri: configService.get<string>("mongodb.url"),
        };
    },
    inject: [ConfigService],
};
