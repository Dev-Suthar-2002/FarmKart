import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './farmer.schema';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('farmer')
export class FarmerController {
    constructor(private readonly farmerService: FarmerService) { }

    @Post()
    async create(@Body() createFarmerDto: CreateFarmerDto): Promise<Farmer> {
        return this.farmerService.createFarmer(createFarmerDto);
    }

    @Get()
    async findAll(): Promise<Farmer[]> {
        return this.farmerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Farmer> {
        return this.farmerService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFarmerDto: UpdateFarmerDto,
        @Request() payload
    ): Promise<Farmer> {
        const userId = payload.user._id;

        if (userId.toString() !== id) {
            throw new NotFoundException(`You are not allowed to update this profile`);
        }

        return this.farmerService.updateFarmer(userId, updateFarmerDto);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.farmerService.deleteFarmer(id);
    }
}
