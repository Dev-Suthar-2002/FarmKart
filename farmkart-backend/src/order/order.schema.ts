import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Document } from "mongoose";
import { Customer } from "src/customer/customer.schema";
import { Product } from "src/product/product.schema";

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    DELIVERED = "delivered",
    CANCELLED = "canceled"
}

export enum PaymentMethod {
    CREDIT_CARD = "creditcard",
    DEBIT_CARD = "debitcard",
    CASH_ON_DELIVERY = "cashondelivery",
    PAYPAL = "paypal"
}

export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Order extends Document {
    @Prop({ required: true })
    totalPrice: number;

    @Prop({ type: Date, required: true })
    estimatedDeliveryDate: Date;

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ type: String, enum: PaymentMethod, required: true })
    paymentMethod: PaymentMethod;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;

    @Prop()
    transactionId: string;

    @Prop([
        {
            product: { type: Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            farmer: {type: String}
        },
    ])
    products: { product: Types.ObjectId; quantity: number; farmer: string}[];

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
    customer: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);