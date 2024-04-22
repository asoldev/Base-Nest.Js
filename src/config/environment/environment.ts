export const environment = () => ({
    jwt: {
        expiresIn: process.env.JWT_EXPIRES_IN,
        publicKey: process.env.JWT_PUBLISH_KEY,
        privateKey: process.env.JWT_PRIVATE_KEY,
    },
});