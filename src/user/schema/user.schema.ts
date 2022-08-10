import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from '../../posts/schema/post.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  interest: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
