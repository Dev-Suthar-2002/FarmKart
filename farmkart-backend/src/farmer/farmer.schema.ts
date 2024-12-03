import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Product } from "../product/product.schema";

export type FarmerDocument = HydratedDocument<Farmer>;

@Schema({ timestamps: true })
export class Farmer {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
    email: string;

    @Prop({ required: true, minlength: 8 })
    password: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    bio: string;

    @Prop({ required: true, match: /^[0-9]{10}$/ })
    phone: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products: Types.ObjectId[];

    @Prop({ default: 'farmer', enum: ['customer', 'farmer'] })
    role: string;

    _id: Types.ObjectId;
}

export const FarmerSchema = SchemaFactory.createForClass(Farmer);
