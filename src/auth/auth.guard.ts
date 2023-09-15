import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import {GqlExecutionContext} from "@nestjs/graphql";
import {Roles} from "./roles.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const payload = await this.getTokenPayload(context);
        return this.isAuthorized(context, payload.role);
    }

    private async getTokenPayload(context: ExecutionContext): Promise<any> {
        const gqlContext = GqlExecutionContext.create(context);
        const request = gqlContext.getContext().req;
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            return await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
        } catch {
            throw new UnauthorizedException();
        }
    }

    private isAuthorized(context: ExecutionContext, role: string): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }

        return roles.includes(role);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
