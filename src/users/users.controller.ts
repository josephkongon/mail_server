import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthModule } from 'src/auth/auth.module';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authModule: AuthModule,
  ) {}

  @ApiConflictResponse({ description: 'User Registration' })
  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiBody({ type: CreateUserDto })
  @ApiConflictResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalide Credentcial' })
  @Post('login')
  async loginuser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.loginuser(createUserDto);
    if (user.id) {
      const userjwt = await this.authModule.login(user.username, user.id);
      return { id: user.id, username: user.username, jwtToken: userjwt };
    }
    return {
      error: 'invalid',
    };
  }

  @ApiConflictResponse({ description: 'Get All Users' })
  @ApiUnauthorizedResponse({ description: 'Invalide Credentcial' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
