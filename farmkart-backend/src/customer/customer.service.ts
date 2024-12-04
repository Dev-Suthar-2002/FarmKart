import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    ) {}

    // Create a new customer
    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<CustomerDocument> {
        const existingCustomer = await this.customerModel.findOne({ email: createCustomerDto.email }).exec();
        if (existingCustomer) {
            throw new ConflictException(`Customer with email ${createCustomerDto.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
        
        const createdCustomer = new this.customerModel({ ...createCustomerDto, password: hashedPassword });
        return createdCustomer.save(); 
    }

    // Find all customers
    async findAll(): Promise<Customer[]> {
        return this.customerModel.find().populate('orders').exec();
    }

    // Find a customer by ID
    async findOne(id: string): Promise<CustomerDocument> {
        const customer = await this.customerModel.findById(id).populate('orders').exec();

        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return customer;
    }

    async findOneUserByEmail(email: string): Promise<CustomerDocument> {
        const customer = await this.customerModel.findOne({ email }).exec();
        return customer;
    }

    async findOneByEmail(email: string): Promise<CustomerDocument | null> {
        try {
            const customer = await this.customerModel.findOne({ email }).exec();
            return customer;
        } catch (error) {
            console.error(`Error finding customer by email: ${email}`, error);
            return null;
        }
    }

    // Update a customer
    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerDocument> {
        
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(
            id,
            { ...updateCustomerDto },
            { new: true }
        ).exec();

        if (!updatedCustomer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return updatedCustomer;
    }

    // Delete a customer
    async deleteCustomer(id: string): Promise<void> {
        const result = await this.customerModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
    }
}