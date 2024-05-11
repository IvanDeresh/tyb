import { IsNumber, IsString } from 'class-validator';
export class CreateSkillDto {
  @IsString()
  titles: string;
  @IsNumber()
  hourGoal: number;
  @IsString()
  userId: string;
}
