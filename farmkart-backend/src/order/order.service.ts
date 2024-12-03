import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Mode } from 'node:fs';
import { Customer, CustomerDocument } from 'src/customer/customer.schema';
import { Product, ProductDocument } from 'src/product/product.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Customer.name) private customerModel : Model<CustomerDocument>,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Product.name) private productModel : Model<ProductDocument>
    ) { }

    // async createOrder(createOrderDto : CreateOrderDto) : Promise<Order> {
    //     const { customer,products,paymentMethod,estimatedDeliveryDate,status,paymentStatus,transactionId, totalPrice } = createOrderDto;

    //     const newOrder = await new this.orderModel({
    //         customer : customer,
    //         products,
    //         totalPrice,
    //         paymentMethod,
    //         status,
    //         paymentStatus,
    //         transactionId,
    //         estimatedDeliveryDate,
    //     }).save();

    //     await this.customerModel.findByIdAndUpdate(
    //         customer,
    //         { $push: {orders: newOrder._id} },
    //         { new : true},
    //     );

    //     return newOrder;
    // }
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { customer, products, totalPrice } = createOrderDto;
      
        // Check if customer exists
        const existingCustomer = await this.customerModel.findById(customer);
        if (!existingCustomer) {
          throw new NotFoundException(`Customer with ID ${customer} not found`);
        }
      
        // Validate products
        for (const item of products) {
          const product = await this.productModel.findById(item.product);
          if (!product) {
            throw new NotFoundException(`Product with ID ${item.product} not found`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Product ${product.name} has insufficient stock`);
          }
        }
      
        const newOrder = new this.orderModel(createOrderDto);
        await newOrder.save();
      
        // Update customer's order list
        await this.customerModel.findByIdAndUpdate(customer, { $push: { orders: newOrder._id } });
      
        return newOrder;
    }

    async findOrdersByCustomerId(customerId: string): Promise<Order[]> {
      // Validate customer existence
      const customerExists = await this.customerModel.findById(customerId);
      if (!customerExists) {
          throw new NotFoundException(`Customer with ID ${customerId} not found.`);
      }
  
      // Query and return orders
      return this.orderModel
          .find({ customer: customerId })
          .populate('products.product', 'name price') // Populate product details
          .sort({ createdAt: -1 }) // Sort by most recent first
          .exec();
  }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().populate('customer products.product').exec();
    }

    async findOne(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id).populate('customer products.product').exec();
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
        if (!updatedOrder) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return updatedOrder;
    }

    // async deleteOrder(id: string): Promise<void> {
    //     const result = await this.orderModel.findByIdAndDelete(id).exec();
    //     if (!result) {
    //         throw new NotFoundException(`Order with ID ${id} not found`);
    //     }
    // }
    async deleteOrder(id: string): Promise<void> {
        const order = await this.orderModel.findByIdAndDelete(id).exec();
        if (!order) {
          throw new NotFoundException(`Order with ID ${id} not found`);
        }
      
        // Remove order from customer's order list
        await this.customerModel.findByIdAndUpdate(order.customer, { $pull: { orders: id } });
    }
}
