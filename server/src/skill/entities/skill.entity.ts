import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Skill extends Document {
  @Prop({ required: true })
  titles: string;
  @Prop({ required: true })
  hourGoal: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
