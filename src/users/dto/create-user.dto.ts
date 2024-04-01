import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
