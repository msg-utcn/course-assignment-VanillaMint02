import {Injectable, CanActivate, ExecutionContext, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRole} from "../user/models/user-roles";
import {ROLES_KEY} from "./roles.decorator";
import {UserService} from "../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    const dto = await this.userService.getUserByEmail(user.email);
    return requiredRoles.some((role) => dto.roles.includes(role));
  }
}
