import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import {
  INTERVAL_HOST_KEY,
  INTERVAL_SCHEDULER_KEY,
} from './interval-sheduler/interval-sheduler.decorator';

@Injectable()
export class IntervalScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);

      if (!prototype || !instance) {
        return;
      }

      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;

      if (!isIntervalHost) {
        return;
      }

      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);

      methodKeys.forEach((methodKey: string) => {
        const interval = this.reflector.get(
          INTERVAL_SCHEDULER_KEY,
          instance[methodKey],
        );

        if (!interval) {
          return;
        }

        // setInterval(() => {
        //   instance[methodKey]();
        // }, interval);
      });
    });
  }
}
