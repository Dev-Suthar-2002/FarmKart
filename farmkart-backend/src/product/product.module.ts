import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Farmer, FarmerSchema } from 'src/farmer/farmer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: Farmer.name, schema: FarmerSchema },])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService, MongooseModule]
})
export class ProductModule { }