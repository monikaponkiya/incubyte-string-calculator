import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Addition Tests
  it('should add numbers', () => {
    expect(service.add('1,2,3')).toBe(6);
  });

  it('should return 0 for a null string', () => {
    expect(service.add(null)).toBe(0);
  });

  it('should return 0 for an undefined string', () => {
    expect(service.add(undefined)).toBe(0);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself when a single number is provided', () => {
    expect(service.add('1')).toBe(1);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add('1,5')).toBe(6);
  });

  it('should handle multiple numbers', () => {
    expect(service.add('1,2,3,4')).toBe(10);
  });

  it('should support custom delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => service.add('1,-2,3,-4')).toThrow(
      'negative numbers not allowed -2,-4',
    );
  });

  // Subtraction Tests
  it('should subtract numbers correctly', () => {
    expect(service.subtract('10,3,2')).toBe(5); // 10 - 3 - 2 = 5
  });

  it('should return the number itself if only one number is provided', () => {
    expect(service.subtract('10')).toBe(10);
  });

  it('should support custom delimiters for subtraction', () => {
    expect(service.subtract('//;\n10;2')).toBe(8); // 10 - 2 = 8
  });

  // Multiplication Tests
  it('should multiply numbers correctly', () => {
    expect(service.multiply('2,3,4')).toBe(24);
  });

  it('should return the number itself if only one number is provided', () => {
    expect(service.multiply('5')).toBe(5);
  });

  it('should return 0 when multiplying with 0', () => {
    expect(service.multiply('5,0,2')).toBe(0);
  });

  it('should support custom delimiters for multiplication', () => {
    expect(service.multiply('//;\n2;3;2')).toBe(12);
  });

  // Division Tests
  it('should divide numbers correctly', () => {
    expect(service.divide('20,2,2')).toBe(5); // 20 / 2 / 2 = 5
  });

  it('should return the number itself if only one number is provided', () => {
    expect(service.divide('10')).toBe(10);
  });

  it('should support custom delimiters for division', () => {
    expect(service.divide('//;\n20;2;2')).toBe(5);
  });

  it('should throw an error when attempting to divide by zero', () => {
    expect(() => service.divide('10,0')).toThrow(
      'Division by zero is not allowed',
    );
  });
});
