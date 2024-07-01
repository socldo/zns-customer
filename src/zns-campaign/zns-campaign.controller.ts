import { Controller, HttpStatus } from '@nestjs/common';
import { ZnsCampaignService } from './zns-campaign.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateZnsCampaignRequestDto } from './zns-campaign.dto/zns-campaign.dto';
import { ResponseData } from 'src/utils.common/utils.response.common/utils.response.common';
import { BaseHttpClientResult } from 'src/utils.common/utils.httpclient.result.common/utils.base.response.common';
import { status } from '@grpc/grpc-js';
import { ZnsCampaignStatus } from 'src/utils.common/utils.enum/utils.enum';

@Controller('zns-campaign')
export class ZnsCampaignController {

    constructor(private readonly znsCampaignService: ZnsCampaignService) { }

    @GrpcMethod('ZNSCampaignService', 'CreateZnsCampaign')
    async createZnsCampaign(data: CreateZnsCampaignRequestDto): Promise<ResponseData> {

        let response: ResponseData = new ResponseData();
        try {
            if (data.message_recipient == 0) {
                let responseData = await this.znsCampaignService.create(data);
            } else {
                // let listCustomer = await this.znsCampaignService.findDetailByMarketingType(data);
                await this.znsCampaignService.createZnsCampaign(data);

            }
        } catch (error) {
            await this.znsCampaignService.updateStatus(data.id, ZnsCampaignStatus.FAILED);
            await this.znsCampaignService.updateStatusZnsCampaign(data.id, ZnsCampaignStatus.FAILED, 'Danh sách khách hàng không hợp lệ hoặc hệ thống khách hàng aloline gặp lỗi');
        }


        response.setStatusGrpc(HttpStatus.OK);
        response.setMessageGrpc("Thành công");

        return response;
    }

    @GrpcMethod('ZNSCampaignService', 'UpdateZnsCampaignStatus')
    async UpdateZnsCampaignStatus(data: { id: number, status: number }): Promise<ResponseData> {

        let response: ResponseData = new ResponseData();

        await this.znsCampaignService.updateStatus(data.id, data.status);

        response.setStatusGrpc(HttpStatus.OK);
        response.setMessageGrpc("Thành công");

        return response;
    }

    @GrpcMethod('ZNSCampaignService', 'UpdateZnsCampaign')
    async updateZnsCampaign(data: CreateZnsCampaignRequestDto): Promise<ResponseData> {

        let response: ResponseData = new ResponseData();
        try {
            if (data.message_recipient == 0) {
                let responseData = await this.znsCampaignService.update(data.id, data);
            } else {
                // let listCustomer = await this.znsCampaignService.findDetailByMarketingType(data);
                await this.znsCampaignService.updateZnsCampaign(data);

            }
        } catch (error) {
            await this.znsCampaignService.updateStatus(data.id, ZnsCampaignStatus.FAILED);
            await this.znsCampaignService.updateStatusZnsCampaign(data.id, ZnsCampaignStatus.FAILED, 'Danh sách khách hàng không hợp lệ hoặc hệ thống khách hàng aloline gặp lỗi');
        }


        response.setStatusGrpc(HttpStatus.OK);
        response.setMessageGrpc("Thành công");

        return response;
    }
}
