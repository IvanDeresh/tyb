import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
interface Task {
  id: string;
  title: string;
  completed: boolean;
}
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.find(id);
  }
  @Post(':id/task')
  addtask(@Param('id') id: string, @Body() task: Task) {
    return this.goalService.addTask(id, task);
  }
  @Patch('/complete/:id')
  complete(@Param('id') id: string, @Query('taskId') taskId: string) {
    return this.goalService.complete(id, taskId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(id);
  }
}
