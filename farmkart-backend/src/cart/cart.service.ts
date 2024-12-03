import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }


    async createCart(createCartDto: CreateCartDto): Promise<Cart> {
        const createdCart = new this.cartModel(createCartDto);
        return createdCart.save();
    }


    async findAll(): Promise<Cart[]> {
        return this.cartModel.find().populate('customer products.product').exec();
    }


    async findOne(id: string): Promise<Cart> {
        const cart = await this.cartModel.findById(id).populate('customer products.product').exec();
        if (!cart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        return cart;
    }


    async updateCart(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
        const updatedCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true }).populate('customer products.product').exec();
        if (!updatedCart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        return updatedCart;
    }


    async deleteCart(id: string): Promise<Cart> {
        const deletedCart = await this.cartModel.findByIdAndDelete(id).exec();
        if (!deletedCart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        return deletedCart;
    }
}
