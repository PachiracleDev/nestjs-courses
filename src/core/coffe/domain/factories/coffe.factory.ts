import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Coffe } from '../coffe';

@Injectable()
export class CoffeFactory {
  create(name: string, type: string, price: number) {
    const id = randomUUID();
    const coffe = new Coffe(id, name, type, price);

    return coffe;
  }
}
