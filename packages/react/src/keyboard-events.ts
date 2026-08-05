import { KeyboardEvent } from 'react';


export const handleEnterKeyDown =
  (callback: () => void) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

type EventTarget = {
  value?: string;
}

export const handleKeyboardEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: KeyboardEvent<TargetType>) => {
    const { value } = event.target as EventTarget;
    if(!value) {
      throw new Error('Target value is undefined')
    }
    callback(value);
  };

export const handleChangeEvent = handleKeyboardEvent