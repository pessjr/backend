import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { Repository } from 'typeorm';
import { Authentication } from './entities/authentication.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/resources/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/resources/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Authentication)
    private authRepository: Repository<Authentication>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(createAuthenticationDto: CreateAuthenticationDto) {
    const { email, password } = createAuthenticationDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException();
    const isPasswordValid = this._compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const token = await this._generateToken(user);
    this.authRepository.save({
      user,
      token,
      refreshToken: token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return token;
  }

  async _compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async _generateToken(user: User) {
    return await this.jwtService.signAsync({
      roles: user.roles,
      id: user.id,
      email: user.person.email,
      name: user.person.name,
      document: user.person.document,
    });
  }
}
