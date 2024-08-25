import { ConfigService } from '@nestjs/config';

export const databaseProviders = {
    useFactory: async (configService: ConfigService) => {
        return {
            uri: configService.get<string>('mongodb.url'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    },
    inject: [ConfigService],
};
