import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Phone, PhoneSchema } from './phone.model';

export type ZnsCampaignDocument = ZnsCampaign & Document;

@Schema({ collection: "zns_campaigns" })
export class ZnsCampaign {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  restaurant_id: number;

  @Prop({ required: true })
  restaurant_brand_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  template_id: string;

  @Prop({ type: Object })
  template_data: {
    id: string;
    date: string;
    customer_name: string;
  };

  @Prop({ required: true })
  send_at: string;

  @Prop({ required: true })
  running_status: number;

  @Prop({ required: true })
  message_recipient: number;

  @Prop({ type: [PhoneSchema], required: false })
  phones: Phone[];

  @Prop({ required: true })
  authentication_code: string;

  @Prop({ required: false })
  refresh_token: string;

  @Prop({ required: true })
  oa_id?: string;

  @Prop({ required: true })
  app_id?: string;

  @Prop({ required: true })
  code_verifier?: string;

  @Prop({ required: true })
  secret_key?: string;
}

export const ZnsCampaignSchema = SchemaFactory.createForClass(ZnsCampaign);
