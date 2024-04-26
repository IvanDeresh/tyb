import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Goal extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  targetDate: Date;

  @Prop({ default: 0 })
  progress: number;

  @Prop({ required: true })
  userId: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
