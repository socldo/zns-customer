import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmptyString,
  IsNotNull,
} from "src/utils.common/utils.decorator.common/utils.decorator.common";
import WebhookPathDtoJson from "./webhook.order.path.dto";

export class WebhookOrderDto {
  @ApiProperty({
    example: "235XOIWO",
    description: "Id của đơn hàng",
  })
  @IsNotEmptyString()
  readonly order_id: string = "";

  @ApiProperty({
    example: "0963708270",
    description: "Id của nhà cung cấp",
  })
  @IsNotNull()
  readonly supplier_id: string = "";

  @ApiProperty({
    example: "ACCEPTED",
    description: "Trạng thái đơn hàng",
  })
  @IsNotNull()
  readonly status: string;

  @ApiProperty({
    example: "Hết xăng",
    description: "Lý do huỷ đơn",
  })
  @IsNotNull()
  readonly cancel_comment: string;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian tài xế xác nhận đơn hàng",
  })
  @IsNotNull()
  readonly accept_time: number;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian tài xế huỷ đơn",
  })
  @IsNotNull()
  readonly cancel_time: number;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian tài xế bắt đầu chạy",
  })
  @IsNotNull()
  readonly board_time: number;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian nhận hàng",
  })
  @IsNotNull()
  readonly pickup_time: number;

  @ApiProperty({
    example: [],
    description: "Path",
  })
  @IsNotNull()
  readonly path: WebhookPathDtoJson[];
}
