import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import Usuario from "./usuario.entity";

export const obtenerUsuario = createParamDecorator((data, ctx: ExecutionContext): Usuario => {
    const req = ctx.switchToHttp().getRequest();
    return req.user ;
});