import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('add')
  add(@Query('numbers') numbers: string) {
    return { result: this.calculatorService.add(numbers) };
  }

  @Get('subtract')
  subtract(@Query('numbers') numbers: string) {
    return { result: this.calculatorService.subtract(numbers) };
  }

  @Get('multiply')
  multiply(@Query('numbers') numbers: string) {
    return { result: this.calculatorService.multiply(numbers) };
  }

  @Get('divide')
  divide(@Query('numbers') numbers: string) {
    try {
      return { result: this.calculatorService.divide(numbers) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
