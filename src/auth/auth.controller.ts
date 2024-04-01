import { Controller, Post, Body, Res, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Res() res, @Request() req, @Body() signInDto: SignInDto) {
    const a = await this.authService.signIn(signInDto);
    res.send(a)

  }
  @Post('register')
  async createAcount(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createAcount(createUserDto);
  }
}
