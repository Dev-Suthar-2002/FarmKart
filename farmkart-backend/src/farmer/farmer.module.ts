import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Farmer, FarmerSchema } from './farmer.schema';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Farmer.name, schema: FarmerSchema }])],
  providers: [FarmerService],
  controllers: [FarmerController],
  exports: [FarmerService, MongooseModule]
})
export class FarmerModule { }
