import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Skill extends Document {
  @Prop({ required: true })
  titles: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: 0 })
  initialHourSpend: number;
  @Prop({ required: true })
  hourGoal: number;
  @Prop({ required: true })
  userId: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
