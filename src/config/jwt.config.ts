import { registerAs } from "@nestjs/config";

export default registerAs('access_token', () => {
    return {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        accessTokenTtl: parseInt(process.env.JWT_EXPIRES_IN ?? '3600'),
    }
})