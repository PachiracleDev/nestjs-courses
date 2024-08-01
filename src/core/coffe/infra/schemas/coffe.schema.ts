import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Coffe {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  price: number;
}
