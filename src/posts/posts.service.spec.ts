import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
import { PostCategory } from './domain/enum/category.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { TestHelper } from '../../test/helper/test-helper';
import { PostsRepository } from './repositories/posts2.repository';

describe('PostsService', () => {
  let service: PostsService;
  let testHelper: TestHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        await ConfigModule.forRoot({
          envFilePath: `./.${process.env.NODE_ENV}.env`,
          isGlobal: true,
        }),
        DatabaseModule,
      ],
      providers: [PostsService, PostsRepository],
    }).compile();

    const databaseService = module.get<DatabaseService>(DatabaseService);
    testHelper = new TestHelper(databaseService);
    await testHelper.setUpTestDB();
    service = module.get<PostsService>(PostsService);
  });

  afterEach(async () => {
    await testHelper.clearDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('post 를 생성할 수 있다', async () => {
    // given
    const writer = 'writer';
    const type = PostCategory.PUBLIC;
    const title = 'title';
    const content = 'content';

    // when
    const post = await service.create(
      new CreatePostDto({
        writer: writer,
        type: type,
        title: title,
        content: content,
      }),
    );

    // then
    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
  });
});
