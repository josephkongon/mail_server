import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  CreateMessageDto,
  GetUserMessages,
  setMessageReadDto,
} from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('messages')
@UsePipes(ValidationPipe)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiConflictResponse({ description: 'Create a new Message' })
  @ApiUnauthorizedResponse({ description: 'Invalide Credentcial' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateMessageDto })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @ApiConflictResponse({ description: 'Get all User Messages' })
  @ApiUnauthorizedResponse({ description: 'Invalide Credentcial' })
  @ApiBearerAuth()
  @Get(':id')
  findAll(@Param('id') id: string) {
    console.log('getUserMessages', id);

    return this.messagesService.findOne(id);
  }
  @ApiConflictResponse({ description: 'set read Messages' })
  @ApiUnauthorizedResponse({ description: 'Invalide Credentcial' })
  @ApiBearerAuth()
  @ApiBody({ type: setMessageReadDto })
  @Post('setread')
  setRead(@Body() data: any) {
    return this.messagesService.setRead(data);
  }
}
