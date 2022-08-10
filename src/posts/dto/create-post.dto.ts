import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  desc: string;
  @IsOptional()
  hashtag: string;
}
