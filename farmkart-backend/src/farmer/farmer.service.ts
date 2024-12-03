import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farmer, FarmerDocument } from './farmer.schema';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FarmerService {
    constructor(
        @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
    ) {}

    // Create a new farmer
    async createFarmer(createFarmerDto: CreateFarmerDto): Promise<FarmerDocument> {
        const existingFarmer = await this.farmerModel.findOne({ email: createFarmerDto.email }).exec();
        if (existingFarmer) {
            throw new ConflictException(`Farmer with email ${createFarmerDto.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(createFarmerDto.password, 10);
        
        const createdFarmer = new this.farmerModel({ ...createFarmerDto, password: hashedPassword });
        return createdFarmer.save(); 
    }

    // Find all farmers
    async findAll(): Promise<FarmerDocument[]> {
        return this.farmerModel.find().populate('products').exec();
    }

    // Find a farmer by ID
    async findOne(id: string): Promise<FarmerDocument> {
        const farmer = await this.farmerModel.findById(id).populate('products').exec();
        if (!farmer) {
            throw new NotFoundException(`Farmer with ID ${id} not found`);
        }
        return farmer;
    }

    async findOneUserByEmail(email: string): Promise<FarmerDocument> {
        const farmer = await this.farmerModel.findOne({ email }).exec();
        return farmer;
    }

    // Find a farmer by email
    async findOneByEmail(email: string): Promise<FarmerDocument> {
        const farmer = await this.farmerModel.findOne({ email }).exec();
        if (!farmer) {
            throw new NotFoundException(`Farmer with email ${email} not found`);
        }
        return farmer;
    }

    // Update a farmer
    async updateFarmer(id: string, updateFarmerDto: UpdateFarmerDto): Promise<FarmerDocument> {
        // if (!updateFarmerDto.password) {
        //     throw new Error('Password is required to update the user');
        // }

        // const hashedPassword = await bcrypt.hash(updateFarmerDto.password, 10);
        const updatedFarmer = await this.farmerModel.findByIdAndUpdate(
        id,
        { ...updateFarmerDto }, // Spread the updated fields
        { new: true }
    ).exec();

        if (!updatedFarmer) {
            throw new NotFoundException(`Farmer with ID ${id} not found`);
        }

        return updatedFarmer;
    }

    // Delete a farmer
    async deleteFarmer(id: string): Promise<void> {
        const result = await this.farmerModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Farmer with ID ${id} not found`);
        }
    }
}