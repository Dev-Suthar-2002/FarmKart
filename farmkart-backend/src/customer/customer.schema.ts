import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Order } from "src/order/order.schema";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
    email: string;

    @Prop({ required: true, minlength: 8 })
    password: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, match: /^[0-9]{10}$/ })
    phone: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
    orders: Types.ObjectId[];

    @Prop({ default: 'customer', enum: ['customer', 'farmer'] })
    role: string;

    _id: Types.ObjectId;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);