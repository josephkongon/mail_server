import { UsersController } from './users/users.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    MongooseModule.forRoot(
      'mongodb+srv://josephkongon:Nyx52498659@cluster0.6ks1s.mongodb.net/messageDatabase?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
