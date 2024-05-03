import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(id: string) {
    return await this.taskModel.find({ userId: id });
  }
  getById(id: string) {
    return this.taskModel.find({ userId: id });
  }

  async complete(id: string) {
    const task = await this.taskModel.findOne({ _id: id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.completed = !task.completed;
    task.save();
    return await this.taskModel.find();
  }

  async update(id: string, attrs: Partial<UpdateTaskDto>) {
    const task = await this.taskModel.findOne({ userId: id });
    if (!task) {
      return new NotFoundException('Task not found');
    }
    Object.assign(task, attrs);
    return task.save();
  }
  async remove(id: string) {
    const task = await this.taskModel.findOneAndDelete({ _id: id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
