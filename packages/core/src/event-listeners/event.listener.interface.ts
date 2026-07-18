export type EventListenerCallback<EventData> = (data: EventData) => void

export interface IEventListener<EventData> {
  handle: EventListenerCallback<EventData>
  listen: (callback: EventListenerCallback<EventData>) => void
}
