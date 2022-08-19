import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageShema } from 'src/schemas/messages.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageShema }]),
    UsersModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
