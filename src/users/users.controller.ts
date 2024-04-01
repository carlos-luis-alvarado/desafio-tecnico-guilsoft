import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTaskDTO } from 'src/tasks/dto/task.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('user')
  userActive(@Request() req, @Res() res) {
    res.send({
      message: 'User connect',
      email: req.user.email
    })
  }
  @Get('user/tasks')
  async getAllTask(@Request() req, @Res() res) {
    const tasks = await this.usersService.getAllTask(req.user.email);
    res.send({
      tasks
    })
  }
  @Get('user/task/:id')
  async getTask(@Request() req, @Res() res, @Param('id') id: string) {
    const task = await this.usersService.getTaskById(req.user.email, id)
    res.send({
      task,
      user: req.user.email
    })
  }
  @Post('user/create-task')
  async createTask(@Request() req, @Res() res, @Body() createTaskDTO: CreateTaskDTO) {
    const tasks = await this.usersService.createTask(createTaskDTO, req.user.email);
    res.send({
      tasks,
      email: req.user.email
    })
  }
  @Delete('user/delete-task/:id')
  async deleteTask(@Request() req, @Res() res, @Param('id') id: string) {
    const taskDeleted = await this.usersService.deletedTaskById(req.user.email, id)
    res.send({
      taskDeleted,
      email: req.user.email
    })
  }

  @Put('user/update-task/:id')
  async updateTask(@Request() req, @Res() res, @Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
    const taskUpdated = await this.usersService.updateTaskById(req.user.email, id, createTaskDTO)
    res.send({
      taskUpdated,
      email: req.user.email
    })
  }
}
