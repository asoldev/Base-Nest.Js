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
    mongodb: {
        url: process.env.MONGODB_URL,
    },
});
