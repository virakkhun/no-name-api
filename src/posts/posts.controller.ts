import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IMessage } from './interface/IMessage';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto): Promise<IMessage> {
    const post = await this.postsService.post(createPostDto);

    if (post) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Successfully',
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Can not create post',
    };
  }
}
