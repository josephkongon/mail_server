import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @Field()
  @ApiProperty({ type: String, description: 'email' })
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  @Field()
  password: string;
}
