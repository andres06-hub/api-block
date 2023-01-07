import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @IsNotEmpty({
    message: 'Name is Required',
  })
  @IsString()
  @Field()
  name: string;
}
