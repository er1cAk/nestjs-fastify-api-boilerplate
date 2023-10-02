import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/isPublic.decorator';
import { FastifyReply } from 'fastify';
import { ConfigService } from '@nestjs/config';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      expires: new Date(
        Date.now() +
          this.configService.get<number>('JWT_EXPIRES_IN_DAYS') *
            24 *
            60 *
            1000,
      ),
    });
  }
}
