import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return { user: user };
  }
  @Post('/addNewUser')
  async addNewUser(@Body() body: SignInDto) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      return this.userService.create({ name: body.email, ...body });
    }
  }
  @Post('/login')
  async login(@Body() body: SignInDto) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new NotFoundException(`User ${body.email} not found`);
    }
    if (user.password != body.password) {
      throw new NotFoundException('incorrect password');
    }
    return { user: user };
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    console.log(await this.userService.update(id, attrs));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
