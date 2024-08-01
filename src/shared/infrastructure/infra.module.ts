import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { MongoEventStore } from 'src/shared/infrastructure/event-store/mongo-event-store';
import { EventStorePublisher } from 'src/shared/infrastructure/event-store/publishers/event-store.publisher';
import { EventSerializer } from 'src/shared/infrastructure/event-store/serializers/event-serializer';
import { EventSchema } from './event-store/schemas/event-schema';

@Module({
  imports: [
    CqrsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
    MongooseModule.forFeature(
      [{ name: 'Event', schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [EventSerializer, EventStorePublisher, MongoEventStore],
})
export class InfrastructureModule {}
