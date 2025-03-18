import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  let service: CalculatorService;

  beforeEach(async () => {
    const mockService = {
      add: jest.fn().mockReturnValue(6),
      subtract: jest.fn().mockReturnValue(5),
      multiply: jest.fn().mockReturnValue(24),
      divide: jest.fn().mockReturnValue(5),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [{ provide: CalculatorService, useValue: mockService }],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Test Add Endpoint
  it('should return the sum from the add method', () => {
    expect(controller.add('1,2,3')).toEqual({ result: 6 });
    expect(service.add).toHaveBeenCalledWith('1,2,3');
  });

  // Test Subtract Endpoint
  it('should return the result from the subtract method', () => {
    expect(controller.subtract('10,2,3')).toEqual({ result: 5 });
    expect(service.subtract).toHaveBeenCalledWith('10,2,3');
  });

  // Test Multiply Endpoint
  it('should return the result from the multiply method', () => {
    expect(controller.multiply('2,3,4')).toEqual({ result: 24 });
    expect(service.multiply).toHaveBeenCalledWith('2,3,4');
  });

  // Test Divide Endpoint
  it('should return the result from the divide method', () => {
    expect(controller.divide('20,2,2')).toEqual({ result: 5 });
    expect(service.divide).toHaveBeenCalledWith('20,2,2');
  });

  // Test Divide by Zero Handling
  it('should throw a BadRequestException when division by zero occurs', () => {
    jest.spyOn(service, 'divide').mockImplementation(() => {
      throw new Error('Division by zero is not allowed');
    });

    expect(() => controller.divide('10,0')).toThrow(BadRequestException);
  });
});
