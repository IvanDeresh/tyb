import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name) private readonly goalModel: Model<Goal>,
  ) {}
  async create(createGoalDto: CreateGoalDto) {
    return await this.goalModel.create(createGoalDto);
  }

  async findAll() {
    return await this.goalModel.find();
  }

  async findOne(id: string) {
    return await this.goalModel.findOne({ userId: id });
  }

  async update(id: string, attrs: Partial<UpdateGoalDto>) {
    const task = await this.goalModel.findOne({ userId: id });
    if (!task) {
      return new NotFoundException('Task not found');
    }
    Object.assign(task, attrs);
    return task.save();
  }
  async remove(id: string) {
    const task = await this.goalModel.findOneAndDelete({ _id: id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
