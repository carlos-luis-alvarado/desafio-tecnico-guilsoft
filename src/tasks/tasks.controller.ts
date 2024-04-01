import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksServices: TasksService) { }
  // @Post('/create')
  // async createTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
  //   const task = await this.tasksServices.create(createTaskDTO);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Task Successfully created',
  //     task,
  //   });
  // }
  // @Get()
  // async getAllTasks(@Res() res) {
  //   const tasks = await this.tasksServices.getAll();
  //   res.status(HttpStatus.OK).json({
  //     message: 'Tasks succesfully geting',
  //     tasks,
  //   });
  // }
  // @Get(':taskId')
  // async getTask(@Res() res, @Param('taskId') taskId) {
  //   // console.log({ id });
  //   const task = await this.tasksServices.get(taskId);
  //   if (!task) throw new NotFoundException('Task does not exists');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'ok getting',
  //     task,
  //   });
  // }
  // @Delete('/delete/:taskId')
  // async deleteTask(@Res() res, @Param('taskId') taskId) {
  //   const taskDelete = await this.tasksServices.delete(taskId)
  //   if (!taskDelete) throw new NotFoundException('Task does not exists');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Product deleted succesfully',
  //     taskDelete,
  //   });
  // }
  // @Put('./update/:taskiD')
  // async updateTask(
  //   @Res() res,
  //   createTaskDTO: CreateTaskDTO,
  //   @Param('taskId') taskId) {
  //   const updateTask = await this.tasksServices.update(taskId, createTaskDTO)
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Update task',
  //     updateTask
  //   })
  // }
}
