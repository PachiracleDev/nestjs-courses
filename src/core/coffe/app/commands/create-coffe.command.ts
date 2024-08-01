export class CreateCoffeCommand {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly price: number,
  ) {}
}
