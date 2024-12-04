import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Farmer, FarmerDocument } from 'src/farmer/farmer.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(createProductDto);
        const savedProduct = await newProduct.save();
        await this.farmerModel.findByIdAndUpdate(
            createProductDto.farmer,
            { $push: { products: savedProduct._id } },
            { new: true }
        );
    
        return savedProduct;
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().populate('farmer').exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('farmer').exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).populate('farmer').exec();
        if (!updatedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<Product[]> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productModel.findByIdAndDelete(id).exec();
        
        return this.productModel.find().populate('farmer').exec();
    }
}