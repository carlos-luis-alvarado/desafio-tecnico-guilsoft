import { IsString } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly state: string;
}
