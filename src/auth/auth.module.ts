import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfit } from '../config/jwt.config';
import { JwtStrategy } from './Jwt.Strategy';

@Module({
  imports: [JwtModule.registerAsync(jwtConfit), PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule],
})
export class AuthModule {
  constructor(private jwtService: JwtService) {}
  async login(username: string, id: string) {
    const payload = { username, id };
    let token;
    try {
      token = { access_token: this.jwtService.sign(payload) };
    } catch (error) {}
    return token;
  }
}

export interface JwtUser {
  id: string;
  username: string;
}
