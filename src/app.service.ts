import { Injectable } from '@nestjs/common';
import {
  Interval,
  IntervalHost,
} from './interval-sheduler/interval-sheduler.decorator';

@IntervalHost
@Injectable()
export class AppService {
  @Interval(1000)
  getHello(): string {
    console.log('Hello World!');
    return 'Hello World!';
  }
}
