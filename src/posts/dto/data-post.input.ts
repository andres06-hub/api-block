import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType() //Para convertirlo a una entrada
// Detallar que datos espera recibir este Objeto
export class DataPostInput {
  @IsNotEmpty({
    message: 'Title is required!',
  })
  @IsString()
  @MaxLength(100, {
    message: 'Title is too Length',
  })
  @Field()
  title: string;

  @MaxLength(400)
  @Field({ nullable: true })
  content?: string;
}
