import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  getCsrf(@Req() req: Request): Csrf {
    return {
      csrfToken: req.csrfToken(),
    };
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  // Nest.js はデフォルトで Postメソッド は201が帰る
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    // cookie を利用するため Express のレスポンスを使用する
    // Express だと jsonシリアライズしてくれないので、{passthrough:true} にする
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true, // JavaScript から Cookie の値にアクセスを防ぐ設定
      secure: true, // https でしか送らない設定
      sameSite: 'none', // 同じドメインでしか送らない設定
      path: '/', // cookie を送るURLパス
    });

    return {
      message: 'ok',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: 'ok',
    };
  }
}
