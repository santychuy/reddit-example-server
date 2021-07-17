import { InputType, Field } from 'type-graphql';

@InputType()
export class InputSignUp {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
