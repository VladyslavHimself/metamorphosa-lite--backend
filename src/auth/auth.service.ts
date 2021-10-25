import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isObject } from 'class-validator';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}
    

    async createUser(body: AuthDto): Promise<UserEntity> {
        const salt = await genSalt(10)
        const newUser = await this.userRepository.save({
            email: body.email,
            password: await hash(body.password, salt)
        })
        return newUser
    }


    async findUser(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({email})
    }


    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({email})
        if (!isObject(user)) {
            throw new UnauthorizedException('non user')
        }
        const isCorrectPassword = await compare(password, user.password)
        if (!isCorrectPassword) {
            throw new UnauthorizedException('ivalid password')
        }
        return { id: user.id, email: user.email }
    }


    async login(email: string) {
        const payload = { email }
        return { token: await this.jwtService.signAsync(payload) }
    }
}

