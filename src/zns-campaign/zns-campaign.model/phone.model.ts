import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhoneDocument = Phone & Document;

@Schema()
export class Phone {
  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false, default: false })
  is_sent: boolean = false;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
