import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { Post } from '../../entities/Post';
import { MyContext } from '../../types/graphql';

import { InputUpdatePost } from '../inputs/UpdatePost';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { connection }: MyContext): Promise<Post[]> {
    return connection.manager.find(Post);
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id') id: number,
    @Ctx() { connection }: MyContext
  ): Promise<Post | undefined> {
    return connection.manager.findOne(Post, id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Ctx() { connection }: MyContext
  ): Promise<Post> {
    const post = connection.manager.create(Post, { title });
    await connection.manager.save(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('inputUpdateUser') input: InputUpdatePost,
    @Ctx() { connection }: MyContext
  ): Promise<Post | undefined> {
    const { id, title } = input;
    const post = await connection.manager.findOne(Post, id);
    if (!post) return undefined;

    post.title = title;
    await connection.manager.save(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id') id: string,
    @Ctx() { connection }: MyContext
  ): Promise<boolean> {
    await connection.manager.delete(Post, id);
    return true;
  }
}
