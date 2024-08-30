import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Minio from "minio";
import { MinioRepository } from "./minio.repository";

@Injectable()
export class MinioService extends MinioRepository {
    constructor(configService: ConfigService) {
        const minioClient = new Minio.Client({
            endPoint: configService.get<string>("MINIO.ENDPOINT"),
            port: configService.get<number>("MINIO.PORT"),
            useSSL: configService.get<boolean>("MINIO.USE_SSL"),
            accessKey: configService.get<string>("MINIO.ACCESS_KEY"),
            secretKey: configService.get<string>("MINIO.SECRET_KEY"),
        });
        super(minioClient);
    }
}
