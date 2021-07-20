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

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, connection }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) return undefined;

    const user = await connection.manager.findOne(User, req.session.userId);

    return user;
  }

  @Mutation(() => User)
  async signUp(
    @Arg('inputSignUp') input: InputSignUp,
    @Ctx() { connection, req }: MyContext
  ): Promise<User> {
    const { name, password, username } = input;

    const hashedPass = await argon2.hash(password);

    const user = connection.manager.create(User, {
      name,
      username,
      password: hashedPass,
    });

    await connection.manager.save(user);

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg('inputSignUp') input: InputSignIn,
    @Ctx() { connection, req }: MyContext
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

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.NAME_SESSION);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
