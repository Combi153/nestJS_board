import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts/domain/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new Error(`Post 가 존재하지 않습니다 postId : ${postId}`);
    }

    return await this.commentRepository.save(
      Comment.create({ ...createCommentDto, post: post }),
    );
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(
    commentId: string,
    postId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new Error(`Comment 가 존재하지 않습니다 commentId : ${commentId}`);
    }
    if (comment.post.id !== postId) {
      throw new Error(
        `입력한 Post 의 Comment 가 아닙니다. postId: ${postId}, commentId: ${commentId}`,
      );
    }

    await this.commentRepository.update(
      commentId,
      Comment.create({ ...comment, ...updateCommentDto }),
    );

    return await this.commentRepository.findOneBy({ id: commentId });
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
