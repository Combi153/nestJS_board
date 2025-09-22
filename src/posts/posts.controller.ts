import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindPostDto } from 'src/posts/dto/find-post.dto';
import { Post as DomainPost } from './domain/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: '게시글 생성',
  })
  @ApiCreatedResponse({
    type: DomainPost,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<DomainPost> {
    return await this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: '게시글 목록 조회',
  })
  @ApiOkResponse({
    description: '게시글 목록 조회',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { type: 'object', $ref: getSchemaPath(DomainPost) },
        },
        count: { type: 'number' },
        totalPages: { type: 'number' },
        currentPage: { type: 'number' },
        pageSize: { type: 'number' },
      },
    },
  })
  @Get()
  async findAll(@Query() query: FindPostDto): Promise<{
    data: DomainPost[];
    count: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }> {
    const posts = await this.postsService.findAll(query);
    const total = await this.postsService.count(query);
    return {
      data: posts,
      count: total,
      totalPages: Math.ceil(total / query.pageSize),
      currentPage: query.page,
      pageSize: query.pageSize,
    };
  }

  @ApiOperation({
    summary: '게시글 조회',
  })
  @ApiOkResponse({
    type: DomainPost,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DomainPost> {
    return await this.postsService.findOne(id);
  }

  @ApiOperation({
    summary: '게시글 수정',
  })
  @ApiOkResponse({
    type: DomainPost,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<DomainPost> {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({
    summary: '게시글 삭제',
  })
  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
