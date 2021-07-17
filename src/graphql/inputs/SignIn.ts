import { InputType, Field } from 'type-graphql';

@InputType()
export class InputSignIn {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
