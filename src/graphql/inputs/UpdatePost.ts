import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class InputUpdatePost {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;
}
