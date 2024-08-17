export const environment = () => ({
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN,
    publicKey: process.env.JWT_PUBLISH_KEY,
    privateKey: process.env.JWT_PRIVATE_KEY,
    secret: process.env.JWT_SECRET,
  },
  redis: {
    host: process.env.HOST_REDIS,
    port: Number(process.env.PORT_REDIS),
  },
});
