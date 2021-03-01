import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { PostsModule } from '../src/posts/posts.module';
import { PostsService } from '../src/posts/posts.service';
import { INestApplication } from '@nestjs/common';

describe('Posts', () => {
  let app: INestApplication;
  let postsService = {
    findAll: () => [
      {
        id: 3,
        title: 'Testing Title',
        content: 'This is a testing description.',
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PostsModule],
    })
      .overrideProvider(PostsService)
      .useValue(postsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect(postsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
