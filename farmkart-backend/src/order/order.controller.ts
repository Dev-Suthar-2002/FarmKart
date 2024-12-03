import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, ForbiddenException} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './order.schema';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // async create(@Body() createOrderDto: CreateOrderDto, @Request() payload): Promise<Order> {
    //     const customer = payload.user._id;
    //     return this.orderService.createOrder({...createOrderDto,customer});
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() payload): Promise<CreateOrderDto> {
    
      const customer = payload.user._id;
      const order: Order = await this.orderService.createOrder({...createOrderDto,customer});
      return {
        totalPrice: order.totalPrice,
        estimatedDeliveryDate: order.estimatedDeliveryDate,
        paymentMethod: order.paymentMethod,
        customer: order.customer.toString(),
        products: order.products.map(p => ({
          product: p.product.toString(),
          quantity: p.quantity,
        })),
        status: order.status,
        paymentStatus: order.paymentStatus,
        transactionId: order.transactionId || null,
      };
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('customer-orders')
    @UseGuards(JwtAuthGuard)
    async getCustomerOrders(@Request() payload): Promise<Order[]> {
        const customerId = payload.user._id; // Extract customer ID from the token
        return this.orderService.findOrdersByCustomerId(customerId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus,
        @Request() payload,
    ): Promise<Order> {
        if (payload.user.role !== 'farmer') {
            throw new ForbiddenException('Only farmer can update the order status.');
        }
        return this.orderService.updateOrder(id, { status });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.orderService.deleteOrder(id);
    }
}

