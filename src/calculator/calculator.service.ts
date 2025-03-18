import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  private parseNumbers(input: string): number[] {
    if (!input) return [0];

    let delimiter = /,|\n/;
    if (input.startsWith('//')) {
      const parts = input.split('\n');
      delimiter = new RegExp(`[${parts[0].slice(2)}]`);
      input = parts[1];
    }

    const numbers = input.split(delimiter).map((num) => parseInt(num, 10));

    // Handle negative numbers
    const negatives = numbers.filter((num) => num < 0);
    if (negatives.length) {
      throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }

    return numbers;
  }

  add(input: string): number {
    return this.parseNumbers(input).reduce((sum, num) => sum + num, 0);
  }

  subtract(input: string): number {
    const numbers = this.parseNumbers(input);
    return numbers.length > 1
      ? numbers.slice(1).reduce((result, num) => result - num, numbers[0])
      : numbers[0];
  }

  multiply(input: string): number {
    return this.parseNumbers(input).reduce((product, num) => product * num, 1);
  }

  divide(input: string): number {
    const numbers = this.parseNumbers(input);
    if (numbers.includes(0)) {
      throw new Error('Division by zero is not allowed');
    }
    return numbers.length > 1
      ? numbers.slice(1).reduce((result, num) => result / num, numbers[0])
      : numbers[0];
  }
}
