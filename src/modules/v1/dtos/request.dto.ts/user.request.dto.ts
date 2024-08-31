import { PartialType } from "@nestjs/swagger";
import { User } from "src/core/entities/user.schema";

export namespace UserRequestDto {
    export class UserCreateDto extends User {}
    export class UserUpdateDto extends PartialType(UserCreateDto) {}
}
