import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  userId: string;
  @IsString()
  description: string;
  @IsDate()
  deadline: Date;
}
