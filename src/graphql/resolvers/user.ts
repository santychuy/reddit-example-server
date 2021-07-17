import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import argon2 from 'argon2';

import { User } from '../../entities/User';
import { MyContext } from '../../types/graphql';

import { InputSignUp } from '../inputs/SignUp';
import { InputSignIn } from '../inputs/SignIn';
import { UserResponse } from '../responses/UserResponse';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { connection }: MyContext): Promise<User[]> {
    return connection.manager.find(User);
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg('id') id: number,
    @Ctx() { connection }: MyContext
  ): Promise<User | undefined> {
    return connection.manager.findOne(User, id);
  }

  @Mutation(() => User)
  async signUp(
    @Arg('inputSignUp') input: InputSignUp,
    @Ctx() { connection }: MyContext
  ): Promise<User> {
    const { name, password, username } = input;

    const hashedPass = await argon2.hash(password);

    const user = connection.manager.create(User, {
      name,
      username,
      password: hashedPass,
    });
    await connection.manager.save(user);
    return user;
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg('inputSignUp') input: InputSignIn,
    @Ctx() { connection }: MyContext
  ): Promise<UserResponse> {
    const { password, username } = input;

    const user = await connection.manager.findOne(User, { where: { username } });

    if (!user) {
      return {
        errors: [{ message: 'Usuario o contraseña no son válidos' }],
      };
    }

    const validPass = await argon2.verify(user.password, password);

    if (!validPass) {
      return {
        errors: [{ message: 'Usuario o contraseña no son válidos' }],
      };
    }

    return {
      user,
    };
  }
}
