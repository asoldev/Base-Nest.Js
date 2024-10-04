import { ConfigService } from "@nestjs/config/dist/config.service";

export const mongoConfig = {
  provide: "MONGODB_PROVIDER",
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get<string>("mongodb.url"),
    };
  },
  inject: [ConfigService],
};
