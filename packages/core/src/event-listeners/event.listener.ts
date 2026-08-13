import type {
  IEventListener,
  EventListenerCallback,
} from './event.listener.interface';

export class EventListener<EventData> implements IEventListener<EventData> {
  private readonly callbacks: Array<EventListenerCallback<EventData>> = [];

  handle(eventData: EventData): void {
    this.callbacks.forEach(
      (callback: EventListenerCallback<EventData>): void => {
        callback(eventData);
      }
    );
  }

  listen(callback: EventListenerCallback<EventData>): void {
    this.callbacks.push(callback);
  }
}
