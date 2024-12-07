import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createProductDto: CreateProductDto, @Request() payload): Promise<Product> {
        const farmerId = payload.user._id;
        createProductDto.farmer = farmerId;

        return this.productService.createProduct(createProductDto);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Roles(Role.FARMER)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Request() payload
    ): Promise<Product> {
        const product = await this.productService.findOne(id);
        const farmerId = payload.user._id;

        if (product.farmer._id.toString() !== farmerId.toString()) {
            throw new NotFoundException(`You are not allowed to update this product`);
        }

        return this.productService.updateProduct(id, updateProductDto);
    }

    @Roles(Role.FARMER)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() payload): Promise<Product[]> {

        const product = await this.productService.findOne(id);
        const farmerId = payload.user._id;

        if (product.farmer._id.toString() !== farmerId.toString()) {
            throw new NotFoundException(`You are not allowed to delete this product`);
        }

        return this.productService.deleteProduct(id);
    }
}