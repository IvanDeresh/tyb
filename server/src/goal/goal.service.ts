import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
interface Task {
  id: string;
  title: string;
  completed: boolean;
}
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

  async find(id: string) {
    return await this.goalModel.find({ userId: id });
  }

  async addTask(id: string, task: Task) {
    let goal = await this.goalModel.findOne({ _id: id });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    if (!goal.tasks) {
      goal.tasks = []; // Ensure tasks array is initialized
    }
    goal.tasks.push(task);
    await goal.save(); // Wait for save operation to complete
    return goal;
  }

  async complete(id: string, taskId: string) {
    let goal = await this.goalModel.findOne({ _id: id });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    const taskIndex = goal.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    goal.tasks[taskIndex].completed = !goal.tasks[taskIndex].completed;

    goal.markModified('tasks');

    await goal.save();

    return goal;
  }

  async update(id: string, attrs: Partial<UpdateGoalDto>) {
    const goal = await this.goalModel.findOne({ _id: id });
    if (!goal) {
      return new NotFoundException('Task not found');
    }
    Object.assign(goal, attrs);
    return goal.save();
  }
  async remove(id: string) {
    const goal = await this.goalModel.findOneAndDelete({ _id: id });
    if (!goal) {
      throw new NotFoundException('task not found');
    }
    return goal;
  }
}
