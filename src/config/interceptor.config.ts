import { INestApplication } from "@nestjs/common";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";

export function configureGlobalInterceptors(app: INestApplication) {
    app.useGlobalInterceptors(new ResponseInterceptor());
}