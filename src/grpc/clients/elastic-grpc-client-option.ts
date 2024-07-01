import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from '../interfaces/marketing-receiver';
import * as dotenv from 'dotenv';
dotenv.config();
export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.CONFIG_GRPC_JAVA_ELASTIC_SEARCH_HOST}:${process.env.CONFIG_GRPC_JAVA_ELASTIC_SEARCH_PORT}`,
        package: [
            protobufPackage
        ],
        protoPath: [
            join(
                __dirname,
                "../protos/marketing-receiver.proto"
            )
        ],
        loader: {
            keepCase: true,
        },
        channelOptions: {
            "grpc.default_deadline_ms": 2000,
            "grpc.initial_reconnect_backoff_ms": 2000,
            "grpc.service_config": JSON.stringify({
                methodConfig: [
                    {
                        name: [],
                        timeout: { seconds: 10, nanos: 0 },
                        retryPolicy: {
                            maxAttempts: 5,
                            initialBackoff: "0.1s",
                            maxBackoff: "30s",
                            backoffMultiplier: 3,
                            retryableStatusCodes: ["UNAVAILABLE"],
                        },
                    },
                ],
            }),
        },
        keepalive: { keepaliveTimeoutMs: 2000, keepaliveTimeMs: 100000 },
    },
};
