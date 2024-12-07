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
    ) { }

    async createFarmer(createFarmerDto: CreateFarmerDto): Promise<FarmerDocument> {
        const existingFarmer = await this.farmerModel.findOne({ email: createFarmerDto.email }).exec();
        if (existingFarmer) {
            throw new ConflictException(`Farmer with email ${createFarmerDto.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(createFarmerDto.password, 10);
        const createdFarmer = new this.farmerModel({ ...createFarmerDto, password: hashedPassword });

        return createdFarmer.save();
    }

    async findAll(): Promise<FarmerDocument[]> {
        return this.farmerModel.find().populate('products').exec();
    }

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

    async findOneByEmail(email: string): Promise<FarmerDocument | null> {
        try {
            const farmer = await this.farmerModel.findOne({ email }).exec();
            return farmer;
        } catch (error) {
            console.error(`Error finding farmer by email: ${email}`, error);
            return null;
        }
    }

    async updateFarmer(id: string, updateFarmerDto: UpdateFarmerDto): Promise<FarmerDocument> {
        const updatedFarmer = await this.farmerModel.findByIdAndUpdate(
            id,
            { ...updateFarmerDto },
            { new: true }
        ).exec();

        if (!updatedFarmer) {
            throw new NotFoundException(`Farmer with ID ${id} not found`);
        }

        return updatedFarmer;
    }

    async deleteFarmer(id: string): Promise<void> {
        const result = await this.farmerModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Farmer with ID ${id} not found`);
        }
    }
}