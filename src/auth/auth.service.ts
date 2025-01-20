import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ mesenger: string }> {
    const { username, password } = loginUserDto;
    const user = await this.validateUser(username, password)

    if(!user){
      throw new UnauthorizedException('Thông tin không hợp lệ')
    }

    const session = {id: user.id}
    console.log('Session after login:', session);
    return { mesenger: 'Đăng nhập thành công' };
  }

}