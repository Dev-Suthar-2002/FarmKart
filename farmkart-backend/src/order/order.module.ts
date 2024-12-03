import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';
import { Product, ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [
            MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), 
            MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema}]),
            MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
          ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, MongooseModule]
})
export class OrderModule { }
