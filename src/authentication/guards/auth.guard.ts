import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IsPublic } from '../../modules/decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    protected jwtService: JwtService;
    protected configService: ConfigService;
    protected reflector: Reflector;

    constructor(
        jwtService: JwtService,
        configService: ConfigService,
        reflector: Reflector,
    ) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.reflector = reflector;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (this.getReflectorPublic(context)) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Invalid request token');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('jwt.secret'),
            });

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Could not authorize request');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    protected getReflectorPublic(context: ExecutionContext) {
        return this.reflector.getAllAndOverride<boolean>(IsPublic.name, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
}
