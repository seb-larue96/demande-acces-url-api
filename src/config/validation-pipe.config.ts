import { INestApplication, ValidationPipe } from "@nestjs/common";

export function configureValidationPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());
}