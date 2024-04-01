import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDTO } from './dto/task.dto';
import { CreateTaskUserDTO } from './dto/create-task-user.dto';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') readonly taskModel: Model<Task>) { }

  async getAll(idUser: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ user: idUser }, { user: 0, __v: 0 })
    return tasks;
  }
  async get(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    return task;
  }
  async create(createTaskUserDTO: CreateTaskUserDTO): Promise<Task> {
    const task = new this.taskModel(createTaskUserDTO);
    await task.save();
    return task;
  }
  async delete(taskId: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
    return deletedTask;
  }
  async update(
    taskId: string,
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    const updateTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId },
      {
        ...createTaskDTO
      },
      { new: true },
    );
    return updateTask;
  }
}
