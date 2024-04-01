import { IsString, IsUUID } from "class-validator";

export class CreateTaskUserDTO {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly state: string;
  @IsUUID()
  readonly user: string;
}