import { ApolloGatewayDriver } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument, MessageSecType } from 'src/schemas/messages.shema';
import { UsersService } from 'src/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Messages')
    private readonly messagesModule: Model<MessageDocument>,
    private readonly usersService: UsersService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const user_id = createMessageDto.userId;
    const check = await this.usersService.findOne(user_id);
    if (check) {
      const checkM = await this.messagesModule.findOne({ user_id });
      if (!checkM) {
        const msg = {
          userId: createMessageDto.userId,
          messages: [
            {
              subject: createMessageDto.subject,
              content: createMessageDto.content,
              isRead: createMessageDto.isRead,
            },
          ],
        };
        const result = new this.messagesModule(msg);
        const save = await result.save();
        return {
          send: true,
        };
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const msgs = checkM?.messages;
      msgs.push({
        subject: createMessageDto.subject,
        content: createMessageDto.content,
        isRead: createMessageDto.isRead,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checkM?.messages = msgs;
      checkM.save();
      try {
        check.save();
        return { send: true };
      } catch (error) {}
    }
  }

  findAll() {
    return this.messagesModule.find();
  }

  async findOne(id: string) {
    return await this.messagesModule.findOne({ userId: id });
  }

  async setRead(data: any) {
    const msg = await this.messagesModule.findOne({ userId: data.userId });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    msg.messages.forEach((element: any) => {
      if (element._id.toString() === data.messageId) {
        element.isRead = true;
      }
    });
    msg.save();
  }
}
