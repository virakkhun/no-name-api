import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  desc: string;

  @Prop()
  hashtag: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
