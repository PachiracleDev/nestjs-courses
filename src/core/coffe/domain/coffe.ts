import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';

export class Coffe extends VersionedAggregateRoot {
  public name: string;

  public type: string;

  public price: number;

  constructor(
    public id: string,
    name: string,
    type: string,
    price: number,
  ) {
    super();
    this.name = name;
    this.type = type;
    this.price = price;
  }

  acknowledge() {}
}
