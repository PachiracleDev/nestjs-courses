import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { join } from 'path';
import { Observable, filter, firstValueFrom, fromEvent, map } from 'rxjs';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;

  private message$: Observable<{ id: string; result: number }>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));

    this.message$ = fromEvent(this.worker, 'message') as Observable<{
      id: string;
      result: number;
    }>;
  }

  async onApplicationShutdown() {
    this.worker.terminate();
  }

  run(n: number) {
    const id = Math.random().toString(36).substr(2, 5);
    console.log(id, 'idid');
    console.log(n, 'nnnn');
    this.worker.postMessage({ id, n });

    return firstValueFrom(
      this.message$.pipe(
        filter((message) => message.id === id),
        map((message) => message.result),
      ),
    );
  }
}
