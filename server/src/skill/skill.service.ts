import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './entities/skill.entity';
import { Model } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private taskModel: Model<Skill>) {}
  create(createSkillDto: CreateSkillDto) {
    return this.taskModel.create(createSkillDto);
  }

  async findAll(id: string) {
    return await this.taskModel.find({ userId: id });
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  async update(id: string, attrs: Partial<CreateSkillDto>) {
    const skill = await this.taskModel.findOne({ _id: id });
    if (!skill) {
      return new NotFoundException('Skill not found');
    }
    Object.assign(skill, attrs);
    return skill.save();
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
