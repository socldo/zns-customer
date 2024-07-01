// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v3.5.1
// source: marketing-receiver.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "vn.techres.microservice.grpc.java.elasticsearch.marketing.receiver";

export interface MarketingRequest {
  restaurant_id: number;
  restaurant_brand_id: number;
  marketing_type: number;
  condition: number;
  limit: number;
  offset: number;
}

export interface ListRestaurantMarketingReceiverResponse {
  status: number;
  message: string;
  data: BaseListDataResponse | undefined;
}

export interface BaseListDataResponse {
  list: RestaurantMarketingReceiver[];
  total_record: number;
  limit: number;
}

export interface ListRestaurantMarketingReceiverDetailResponse {
  status: number;
  message: string;
  data: BaseListDataDetailResponse | undefined;
}

export interface BaseListDataDetailResponse {
  list: RestaurantMarketingReceiverDetail[];
  total_record: number;
  limit: number;
}

export interface RestaurantMarketingReceiverDetail {
  customer_id: number;
  phone: string;
  name: string;
}

export interface RestaurantMarketingReceiver {
  customer_id: number;
}

export const VN_TECHRES_MICROSERVICE_GRPC_JAVA_ELASTICSEARCH_MARKETING_RECEIVER_PACKAGE_NAME =
  "vn.techres.microservice.grpc.java.elasticsearch.marketing.receiver";

export interface RestaurantMarketingReceiverServiceClient {
  findByMarketingType(
    request: MarketingRequest,
    metadata?: Metadata,
  ): Observable<ListRestaurantMarketingReceiverResponse>;

  findDetailByMarketingType(
    request: MarketingRequest,
    metadata?: Metadata,
  ): Observable<ListRestaurantMarketingReceiverDetailResponse>;
}

export interface RestaurantMarketingReceiverServiceController {
  findByMarketingType(
    request: MarketingRequest,
    metadata?: Metadata,
  ):
    | Promise<ListRestaurantMarketingReceiverResponse>
    | Observable<ListRestaurantMarketingReceiverResponse>
    | ListRestaurantMarketingReceiverResponse;

  findDetailByMarketingType(
    request: MarketingRequest,
    metadata?: Metadata,
  ):
    | Promise<ListRestaurantMarketingReceiverDetailResponse>
    | Observable<ListRestaurantMarketingReceiverDetailResponse>
    | ListRestaurantMarketingReceiverDetailResponse;
}

export function RestaurantMarketingReceiverServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findByMarketingType", "findDetailByMarketingType"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RestaurantMarketingReceiverService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RestaurantMarketingReceiverService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RESTAURANT_MARKETING_RECEIVER_SERVICE_NAME = "RestaurantMarketingReceiverService";
