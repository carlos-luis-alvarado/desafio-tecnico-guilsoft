import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneUser(signInDto.email)
    if (!user) {
      throw new BadRequestException()
    }
    let conditionPassword = await this.usersService.comparePass(signInDto.password, user.password)
    if (!conditionPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
    }
    return {
      acces_token: await this.jwtService.signAsync(payload),
      email: user.email
    }
  }

  async createAcount(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }
  // ---------------------
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);
    if (!user) {
      throw new BadRequestException()
    }
    let conditionPassword = await this.usersService.comparePass(password, user.password)
    if (conditionPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
