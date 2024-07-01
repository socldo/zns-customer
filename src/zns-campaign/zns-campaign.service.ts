import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ZnsCampaign, ZnsCampaignDocument } from './zns-campaign.model/zns-campaign.schema';
import { Model } from 'mongoose';
import { CreateZnsCampaignRequestDto } from './zns-campaign.dto/zns-campaign.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc/clients/elastic-grpc-client-option';
import { ListRestaurantMarketingReceiverDetailResponse, RestaurantMarketingReceiverDetail, RestaurantMarketingReceiverServiceClient } from 'src/grpc/interfaces/marketing-receiver';
import { BaseHttpClientResult } from 'src/utils.common/utils.httpclient.result.common/utils.base.response.common';
import { Phone } from './zns-campaign.model/phone.model';
import { Observable } from 'rxjs';
import { grpcZnsCampaignClientOptions } from 'src/grpc/clients/zns-campaign-grpc-client-option';
import { ZNSCampaignServiceClient } from 'src/grpc/interfaces/zns-campaign';

@Injectable()
export class ZnsCampaignService implements OnModuleInit {
    @Client(grpcClientOptions)
    private readonly client: ClientGrpc;

    @Client(grpcZnsCampaignClientOptions)
    private readonly clientZnsCampaign: ClientGrpc;

    private grpcService: RestaurantMarketingReceiverServiceClient;

    private grpcZnsCampaignService: ZNSCampaignServiceClient;

    constructor(
        @InjectModel(ZnsCampaign.name) private znsCampaignModel: Model<ZnsCampaignDocument>,
    ) {
    }
    onModuleInit() {
        this.grpcService = this.client.getService<RestaurantMarketingReceiverServiceClient>('RestaurantMarketingReceiverService');
        this.grpcZnsCampaignService = this.clientZnsCampaign.getService<ZNSCampaignServiceClient>('ZNSCampaignService');

    }

    async create(createZnsCampaignRequestDto: CreateZnsCampaignRequestDto): Promise<ZnsCampaign> {
        const createdCampaign = new this.znsCampaignModel(createZnsCampaignRequestDto);
        return createdCampaign.save();
    }

    async findAll(): Promise<ZnsCampaign[]> {
        return this.znsCampaignModel.find().exec();
    }

    async findOne(id: number): Promise<ZnsCampaign> {
        return this.znsCampaignModel.findOne({ id }).exec();
    }

    async update(id: number, updateZnsCampaignDto: CreateZnsCampaignRequestDto): Promise<ZnsCampaign> {
        return this.znsCampaignModel.findOneAndUpdate({ id }, updateZnsCampaignDto, { new: true }).exec();
    }

    async updateStatus(id: number, status: number): Promise<ZnsCampaign> {
        return this.znsCampaignModel.findOneAndUpdate({ id }, { running_status: status }, { new: true }).exec();
    }

    async delete(id: number): Promise<any> {
        return this.znsCampaignModel.deleteOne({ id }).exec();
    }

    async findByMarketingType(data: CreateZnsCampaignRequestDto): Promise<BaseHttpClientResult> {
        let result = new BaseHttpClientResult();
        console.log(this.client.getClientByServiceName);

        // Call the gRPC service
        const marketingRequest = {
            restaurant_id: data.restaurant_id,
            restaurant_brand_id: data.restaurant_brand_id,
            marketing_type: data.message_recipient, // Example marketing type
            condition: -1, // Example condition
            limit: 100000, // Example limit
            offset: 0, // Example offset
        };

        const grpcResponse = await this.grpcService.findByMarketingType(marketingRequest).toPromise();

        // Process gRPC response
        result.setData(grpcResponse.data);
        result.setStatus(grpcResponse.status);
        result.setMessage(grpcResponse.message);

        return result;
    }

    async updateStatusZnsCampaign(id: number, status: number, failed_note: string): Promise<BaseHttpClientResult> {
        let result = new BaseHttpClientResult();

        const grpcResponse = await this.grpcZnsCampaignService.updateZnsCampaignStatus({ id: id, status: status, failed_note: failed_note }).toPromise();

        // Process gRPC response
        result.setData(grpcResponse.data);
        result.setStatus(grpcResponse.status);
        result.setMessage(grpcResponse.message);

        return result;
    }


    async findDetailByMarketingType(data: CreateZnsCampaignRequestDto): Promise<ListRestaurantMarketingReceiverDetailResponse> {
        const limit = 10000; // Số lượng khách hàng mỗi lần gọi
        let offset = 0;
        let combinedList: RestaurantMarketingReceiverDetail[] = [];
        let totalRecord = 0;

        try {
            while (true) {
                const marketingRequest = {
                    restaurant_id: data.restaurant_id,
                    restaurant_brand_id: data.restaurant_brand_id,
                    marketing_type: data.message_recipient,
                    condition: -1,
                    limit: limit,
                    offset: offset,
                };

                const grpcResponse = await this.grpcService.findDetailByMarketingType(marketingRequest).toPromise();

                if (!grpcResponse || !grpcResponse.data || !grpcResponse.data.list) {
                    break; // Dừng lại nếu không còn dữ liệu
                }
                combinedList = combinedList.concat(grpcResponse.data.list);
                totalRecord = grpcResponse.data.total_record;
                offset += limit;

                // Dừng lại nếu đã lấy hết tất cả dữ liệu
                if (combinedList.length >= totalRecord) {
                    break;
                }
            }

            // Tạo response cuối cùng
            const finalResponse: ListRestaurantMarketingReceiverDetailResponse = {
                status: 200, // Status success
                message: 'Success',
                data: {
                    list: combinedList,
                    total_record: totalRecord,
                    limit: limit,
                },
            };

            return finalResponse;
        } catch (error) {
            console.error('Error calling gRPC service', error);
            throw new Error('Error fetching marketing details');
        }
    }

    async createZnsCampaign(createZnsCampaignDto: CreateZnsCampaignRequestDto,): Promise<ZnsCampaign> {

        const listCustomer: ListRestaurantMarketingReceiverDetailResponse = await this.findDetailByMarketingType(createZnsCampaignDto);
        console.log('ok 2', listCustomer);

        // Map phones data to Phone model
        const phones: Phone[] = listCustomer.data.list.map(customer => ({
            phone: customer.phone,
            name: customer.name,
            is_sent: false,
        }));

        // Create new ZnsCampaign instance
        const createdZnsCampaign = new this.znsCampaignModel({
            ...createZnsCampaignDto,
            phones: phones,
        });

        return createdZnsCampaign.save();
    }

    async updateZnsCampaign(createZnsCampaignDto: CreateZnsCampaignRequestDto,): Promise<ZnsCampaign> {

        const listCustomer: ListRestaurantMarketingReceiverDetailResponse = await this.findDetailByMarketingType(createZnsCampaignDto);

        // Map phones data to Phone model
        const phones: Phone[] = listCustomer.data.list.map(customer => ({
            phone: customer.phone,
            name: customer.name,
            is_sent: false,
        }));

        createZnsCampaignDto.phones = phones;

        return this.znsCampaignModel.findOneAndUpdate({ id : createZnsCampaignDto.id }, createZnsCampaignDto, { new: true }).exec();
    }
}

