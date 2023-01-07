import { Field, InputType } from '@nestjs/graphql';

@InputType() //Para convertirlo a una entrada
// Detallar que datos espera recibir este Objeto
export class DataPostInput {
  @Field()
  title: string;
  @Field()
  content: string;
}
