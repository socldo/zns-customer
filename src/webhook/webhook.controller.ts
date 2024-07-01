import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { ApiOperation } from "@nestjs/swagger";
import { WebhookOrderDto } from "./webhook.order.dto/webhook.order.dto";

@Controller("webhook")
export class WebhookController {
  @ApiOperation({
    summary: "Callback update đơn hàng Techres",
  })
  @Post("/update-order")
  async updateOrder(
    @Body(new ValidationPipe())
    request: WebhookOrderDto,
    @Res() res: Response
  ): Promise<any> {
    let response: ResponseData = new ResponseData();
    // let responseData: any = await this.orderService.fetchCreateOrder(
    //   createOrderDto
    // );
    // console.log("responseData", responseData);

    // if (responseData) {
    //   response.setStatus(HttpStatus.OK);
    //   responseData ? response.setData(responseData) : 0;
    // } else {
    //   response.setStatus(HttpStatus.BAD_REQUEST);
    //   response.setMessage(HttpStatus.BAD_REQUEST, responseData);
    // }

    return res.status(HttpStatus.OK).send(response);
  }
}
