import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateSkillDto {
  @IsOptional()
  houtGoal: number;
  @IsNumber()
  hourSpend: number;
}
