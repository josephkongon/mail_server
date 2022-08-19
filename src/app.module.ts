import { UsersController } from './users/users.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MessagesModule,
    MongooseModule.forRoot(process.env.DATABASE),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
