// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v3.5.1
// source: zns-campaign.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "vn.techres.microservice.grpc.nestjs_zns_campagin";

export interface CreateZnsCampaignRequest {
  id: number;
  restaurant_id: number;
  restaurant_brand_id: number;
  name: string;
  template_id: string;
  template_data: TemplateDataRequest | undefined;
  send_at: string;
  running_status: number;
  message_recipient: number;
  phones: PhoneDataRequest[];
  authentication_code: string;
  refresh_token: string;
}

export interface UpdateZnsCampaignStatusRequest {
  id: number;
  status: number;
  failed_note: string;
}

export interface UpdateRefreshTokenRequest {
  id: number;
  refresh_token: string;
}

export interface TemplateDataRequest {
  id: string;
  date: string;
  customer_name: string;
}

export interface BaseResponse {
  status: number;
  message: string;
  data: EmptyResponse | undefined;
}


export interface PhoneDataRequest {
  phone: string;
  name: string;
}

export interface EmptyResponse {
}

export const VN_TECHRES_MICROSERVICE_GRPC_NESTJS_ZNS_CAMPAGIN_PACKAGE_NAME =
  "vn.techres.microservice.grpc.nestjs_zns_campagin";

export interface ZNSCampaignServiceClient {
  createZnsCampaign(request: CreateZnsCampaignRequest, metadata?: Metadata): Observable<BaseResponse>;

  updateZnsCampaign(request: CreateZnsCampaignRequest, metadata?: Metadata): Observable<BaseResponse>;

  updateRefreshToken(request: UpdateRefreshTokenRequest, metadata?: Metadata): Observable<BaseResponse>;

  updateZnsCampaignStatus(request: UpdateZnsCampaignStatusRequest, metadata?: Metadata): Observable<BaseResponse>;
}

export interface ZNSCampaignServiceController {
  createZnsCampaign(
    request: CreateZnsCampaignRequest,
    metadata?: Metadata,
  ): Promise<BaseResponse> | Observable<BaseResponse> | BaseResponse;

  updateZnsCampaign(
    request: CreateZnsCampaignRequest,
    metadata?: Metadata,
  ): Promise<BaseResponse> | Observable<BaseResponse> | BaseResponse;

  updateRefreshToken(
    request: UpdateRefreshTokenRequest,
    metadata?: Metadata,
  ): Promise<BaseResponse> | Observable<BaseResponse> | BaseResponse;

  updateZnsCampaignStatus(
    request: UpdateZnsCampaignStatusRequest,
    metadata?: Metadata,
  ): Promise<BaseResponse> | Observable<BaseResponse> | BaseResponse;
}

export function ZNSCampaignServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createZnsCampaign",
      "updateZnsCampaign",
      "updateRefreshToken",
      "updateZnsCampaignStatus",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ZNSCampaignService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ZNSCampaignService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const Z_NS_CAMPAIGN_SERVICE_NAME = "ZNSCampaignService";
