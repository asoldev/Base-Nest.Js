import { plainToClass } from 'class-transformer';

export class BaseDto {
    static plainToClass<T>(cls: new (...args: any[]) => T, plain: object): T {
        return plainToClass(cls, plain, { excludeExtraneousValues: true });
    }

    static arrayPlainToClass<T>(
        cls: new (...args: any[]) => T,
        plains: Array<T>,
    ): T[] {
        return plains.map((plain) =>
            plainToClass(cls, plain, { excludeExtraneousValues: true }),
        );
    }
}
