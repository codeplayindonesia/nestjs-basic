import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(this.reflector, "<<<< this.reflector")
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }

    // perlu baca request.headers
    const request = context.switchToHttp().getRequest();
    console.log(request.headers, "<<< headers")

    return roles.includes(request.headers.token)

    // false -> throw new ForbiddenException
    // return false
  }
}