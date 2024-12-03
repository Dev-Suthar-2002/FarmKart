import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.schema';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';



@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Customer> {
        return this.customerService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
        @Request() payload
    ): Promise<Customer> {
        const userId = payload.user._id;

        if (userId.toString() !== id) {
            throw new NotFoundException(`You are not allowed to update this profile`);
        }

        return this.customerService.updateCustomer(userId, updateCustomerDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.customerService.deleteCustomer(id);
    }
}
