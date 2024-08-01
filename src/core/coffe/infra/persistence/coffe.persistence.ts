import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coffe } from '../schemas/coffe.schema';

@Injectable()
export class CoffeRepository {
  constructor(
    @InjectModel(Coffe.name)
    private readonly coffeModel: Model<Coffe>,
  ) {}

  async create(coffe: Coffe) {
    return await this.coffeModel.create(coffe);
  }

  async list() {
    return await this.coffeModel.find().exec();
  }
}
