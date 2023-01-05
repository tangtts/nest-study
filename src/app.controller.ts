import { AppService } from './app.service';
import { Controller, Request, Post, UseGuards,Get, Res, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Query() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Query() req) {
    return req.user;
  }
}
