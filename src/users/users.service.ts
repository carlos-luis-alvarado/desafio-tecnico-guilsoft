import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt'
import { SALTOTROUNDS } from './constants/constants';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDTO } from 'src/tasks/dto/task.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') readonly userModel: Model<User>,
    private readonly tasksService: TasksService
  ) { }
  //function
  async encryptPass(password: string): Promise<string> {
    return await bcrypt.hash(password, SALTOTROUNDS)
  }
  async comparePass(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  private async verifyTaskUser(email: string, id: string) {
    const userPromise = this.findOneUser(email);
    const taskPromise = this.tasksService.get(id)
    const [user, task] = await Promise.all([userPromise, taskPromise]);
    if (!user || !task) {
      throw new BadRequestException()
    }
    if (String(user._id) !== String(task.user)) {
      throw new BadRequestException()
    }
    return task;
  }
  //-----------------------
  async create(createUserDto: CreateUserDto): Promise<{ name, email }> {
    let user = await this.findOneUser(createUserDto.email)
    if (user) throw new BadRequestException();
    const newPassword = await this.encryptPass(createUserDto.password);
    const newUser = {
      ...createUserDto,
      password: newPassword,
    }
    user = new this.userModel(newUser);
    await user.save();
    const { name, email } = user
    return { name, email };
  }


  async findOneUser(email: string) {
    return await this.userModel.findOne({
      email
    })
  }

  async getAllTask(email: string) {
    const user = await this.findOneUser(email);
    return this.tasksService.getAll(user._id)
  }
  async getAllbyProject(email:string,project:string){
    const user = await this.findOneUser(email);
    console.log({project});
    console.log(user._id);
    return this.tasksService.getTasksbyProyect(user._id,project)
  }
  async createTask(createTaskDTO: CreateTaskDTO, email: string) {
    const user = await this.findOneUser(email);
    const task = {
      user: user._id,
      ...createTaskDTO
    }
    await this.tasksService.create(task)
    return await this.tasksService.getAll(user._id)
  }
  async getTaskById(email: string, id: string) {
    const task = await this.verifyTaskUser(email, id);
    const {
      title,
      description,
      state,
      created_at
      , updated_at } = task
    return {
      title,
      description,
      state,
      created_at
      , updated_at
    };
  }
  async deletedTaskById(email: string, id: string) {
    const task = await this.verifyTaskUser(email, id);
    const deletedTask = await this.tasksService.delete(task._id)
    return deletedTask;
  }
  async updateTaskById(email: string, id: string, createTaskDTO: CreateTaskDTO) {
    const task = await this.verifyTaskUser(email, id);
    const updateTask = await this.tasksService.update(task._id, createTaskDTO);
    return updateTask;
  }
}