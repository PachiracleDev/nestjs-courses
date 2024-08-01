export class CoffeCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly price: number,
  ) {}
}
