import { Module } from '@nestjs/common';
import { ZnsCampaignController } from './zns-campaign.controller';
import { ZnsCampaignService } from './zns-campaign.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Phone, PhoneSchema } from './zns-campaign.model/phone.model';
import { ZnsCampaign, ZnsCampaignSchema } from './zns-campaign.model/zns-campaign.schema';

@Module({
  controllers: [ZnsCampaignController],
  providers: [ZnsCampaignService],
  imports: [
    MongooseModule.forFeature([
      { name: ZnsCampaign.name, schema: ZnsCampaignSchema },
      { name: Phone.name, schema: PhoneSchema }
    ])
  ]
})
export class ZnsCampaignModule { }