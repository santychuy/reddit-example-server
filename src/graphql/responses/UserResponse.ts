/* eslint-disable max-classes-per-file */
import { ObjectType, Field } from 'type-graphql';

import { User } from '../../entities/User';

@ObjectType()
class FieldError {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
