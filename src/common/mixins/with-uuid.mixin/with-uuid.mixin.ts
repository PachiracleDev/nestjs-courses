import { Type } from '@nestjs/common';

export class WithUuidMixin {}

export function WithUUID<TBase extends Type>(Base: TBase) {
  return class extends Base {
    uuid: string = '1234-5678-9012-3456';
  };
}

export class CoffeEntity {
  name: string;
}

const CoffeeWithUUID = WithUUID(CoffeEntity);

const coffee = new CoffeeWithUUID();

console.log(coffee.uuid); // 1234-5678-9012-3456
