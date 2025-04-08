import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private config: ConfigService) { }
    @Post('register')
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const { access_token } = await this.authService.signup(signupDto)
        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: 'lax'
        })
        return { message: 'Signup Successfully' }
    }
    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { access_token } = await this.authService.login(dto);
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60,
            sameSite: 'lax',
        });
        return { message: 'Login successful' };
    }
}
