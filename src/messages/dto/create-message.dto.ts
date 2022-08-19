import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'subject' })
  subject: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'contect' })
  content: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isRead' })
  isRead: boolean;
}

export class GetUserMessages {
  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;
}

export class setMessageReadDto {
  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'messageId' })
  messageId: string;
}
