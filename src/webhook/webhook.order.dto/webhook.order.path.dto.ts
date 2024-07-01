import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmptyString,
  IsNotNull,
} from "src/utils.common/utils.decorator.common/utils.decorator.common";

export default class WebhookPathDtoJson {
  @ApiProperty({
    example:
      "725 Hẻm số 7 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Việt Nam",
    description:
      "lat and lng is not required but address field in parameters needs to have correct information as shown in the format below user_free_text_input, ward, province/district, city",
  })
  @IsNotNull()
  readonly address: string = "";

  @ApiProperty({
    example: 85000,
    description: "cod",
  })
  @IsNotNull()
  readonly cod: number;

  @ApiProperty({
    example: "",
    description: "por_info",
  })
  @IsNotNull()
  readonly por_info: string = "";

  @ApiProperty({
    example: "Quận 10",
    description: "short_address",
  })
  @IsNotNull()
  readonly short_address: string = "";

  @ApiProperty({
    example: "Quận 10",
    description: "formatted_address",
  })
  @IsNotNull()
  readonly formatted_address: string = "";

  @ApiProperty({
    example: "Bao",
    description: "name",
  })
  @IsNotNull()
  readonly name: string = "";

  @ApiProperty({
    example: "09xxxxxxxx",
    description: "mobie",
  })
  @IsNotNull()
  readonly mobile: string = "";

  @ApiProperty({
    example: "CANCELLED",
    description: "status",
  })
  @IsNotNull()
  readonly status: string = "";

  @ApiProperty({
    example: "10.92839",
    description: "lat",
  })
  @IsNotNull()
  readonly complete_lat: string = "";

  @ApiProperty({
    example: "106.09019",
    description: "lng",
  })
  @IsNotNull()
  readonly complete_lng: string = "";

  @ApiProperty({
    example: "10.92839",
    description: "fail_lat",
  })
  @IsNotNull()
  readonly fail_lat: string = "";

  @ApiProperty({
    example: "106.09019",
    description: "fail_lng",
  })
  @IsNotNull()
  readonly fail_lng: string = "";

  @ApiProperty({
    example: "012312313",
    description: "Thời gian hoàn tất",
  })
  @IsNotNull()
  readonly complete_time: number;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian fail",
  })
  @IsNotNull()
  readonly fail_time: number;

  @ApiProperty({
    example: "012312313",
    description: "Thời gian hoàn đơn",
  })
  @IsNotNull()
  readonly return_time: number;

  @ApiProperty({
    example: "",
    description: "pod_info",
  })
  @IsNotNull()
  readonly pod_info: string = "";

  @ApiProperty({
    example: "",
    description: "fail_comment",
  })
  @IsNotNull()
  readonly fail_comment: string = "";

  @ApiProperty({
    example: "Call me when arrived",
    description: "remarks",
  })
  @IsNotNull()
  readonly remarks: string;
}
