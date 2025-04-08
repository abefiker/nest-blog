import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schemas/user-schema';
import { LoginDto } from './dto/login.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private config: ConfigService) { }
    async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
        const hashedPassword = await argon.hash(signupDto.password)
        const { email, name } = signupDto
        const existedUser = await this.usersService.findOne(email)
        if (existedUser) {
            throw new BadRequestException('User already existed')
        }
        const user = await this.usersService.create({ name, email, password: hashedPassword }) as User & { _id: string }
        if (!user) {
            throw new NotFoundException('User creation failed')
        }
        return this.signToken(user._id, user.email)
    }
    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = loginDto
        const user = await this.usersService.findOne(email) as User & { _id: string }
        if (!user) {
            throw new NotFoundException('Invalid credentials')
        }
        const passwordMatch = argon.verify(user.password, password)
        if (!passwordMatch) {
            throw new NotFoundException('Invalid crendentials')
        }
        return this.signToken(user._id, user.email)
    }
    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const sercret = this.config.get('JWT_SECRET')
        const expirationTime = this.config.get('JWT_EXPIRES_IN')
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: expirationTime,
            secret: sercret
        })
        
        return { access_token: token }
    }
}
