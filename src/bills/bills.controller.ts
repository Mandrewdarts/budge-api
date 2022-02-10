import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Bill } from './entities/bill.entity';

@Controller('bills')
export class BillsController {
  @Get()
  public async index(@Query('start') start, @Query('end') end) {
    const bills = await Bill.createQueryBuilder()
      .where('due >= :start', { start })
      .andWhere('due <= :end', { end })
      .getMany();

    return bills;
  }

  @Post()
  public async store(@Body() body) {
    const newBill = Bill.create({
      name: body.name,
      amount: body.amount,
      due: body.due,
    });

    const bill = await newBill.save();
    return bill;
  }
}
