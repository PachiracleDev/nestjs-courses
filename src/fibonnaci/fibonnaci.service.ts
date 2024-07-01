import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonnaciService {
  execute(num: number) {
    if (num <= 1) {
      return num;
    }
    return this.execute(num - 1) + this.execute(num - 2);
  }
}
