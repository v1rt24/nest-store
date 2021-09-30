import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';

import {ROLE_KEY} from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw '';
            }

            const user = this.jwtService.verify(token);

            req.user = user;
            
            if (!requiredRoles.includes(user.role)) {
                throw '';
            }

            return requiredRoles.includes(user.role);
        } catch (error) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}
