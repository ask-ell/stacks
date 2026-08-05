import { EventHandler } from 'react';


type CustomEventTarget = {
  value?: string;
}

type CustomEvent = {
    target: CustomEventTarget;
}

const handleEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: KeyboardEvent<TargetType>) => {
    const { value } = event.target as CustomEventTarget;
    if (!value) {
      throw new Error('Target value is undefined');
    }
    callback(value);
  };
