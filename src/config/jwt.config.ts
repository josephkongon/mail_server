import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from './app.config';

export const jwtConfit: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: '1w' },
    };
  },
};
