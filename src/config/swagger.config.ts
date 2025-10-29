import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle("DSI - Demande Accès URL")
        .setDescription("DSI - Demande Accès URL - API")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
}