export const environment = () => ({
    jwt: {
        expiresIn: process.env.JWT_EXPIRES_IN,
        publicKey: process.env.JWT_PUBLISH_KEY,
        privateKey: process.env.JWT_PRIVATE_KEY,
        secret: process.env.JWT_SECRET,
    },
    REDIS: {
        URL: process.env.REDIS_URL,
    },
    MINIO: {
        ENDPOINT: process.env.MINIO_ENDPOINT,
        PORT: parseInt(process.env.MINIO_PORT),
        USE_SSL: process.env.MINIO_USE_SSL === "true",
        ACCESS_KEY: process.env.MINIO_ACCESSKEY,
        SECRET_KEY: process.env.MINIO_SECRETKEY,
    },
    mongodb: {
        url: process.env.MONGODB_URL,
    },
});
