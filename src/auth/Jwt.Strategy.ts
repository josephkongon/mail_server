import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from 'src/config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwtSecret,
      //user evn veriable
    });
  }
  async validate(payload: any) {
    //const user = await this.userService.getUserById(payload.name)
    return {
      payload,
    };
  }
}
