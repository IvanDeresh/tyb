import { IsDate, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  description: string;
  @IsString()
  userId: string;
  @IsDate()
  targetDate: Date;
}
