import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { User } from "src/core/entities/user.schema";

export namespace UserRequestDto {
  export class UserCreateDto extends User {}
  export class UserUpdateDto extends PartialType(UserCreateDto) {}
}
