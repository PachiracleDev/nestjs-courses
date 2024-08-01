import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { Event } from './schemas/event-schema';

@Injectable()
export class MongoEventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventModel: Model<Event>,
  ) {}

  async persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventModel.startSession();
    try {
      session.startTransaction();
      await this.eventModel.insertMany(events, { session, ordered: true });

      await session.commitTransaction();
      this.logger.debug('Events inserted successfully to the event store');
    } catch (error) {
      await session.abortTransaction();

      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.warn('Duplicated events found, skipping insertion');
      } else {
        this.logger.error('Error inserting events to the event store ', error);
      }
    } finally {
      session.endSession();
    }
  }
}
