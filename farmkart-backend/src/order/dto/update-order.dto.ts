import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto";
import { IsEnum, IsString } from "class-validator";
import { OrderStatus, PaymentStatus } from "../order.schema";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;

    @IsString()
    transactionId?: string;
}