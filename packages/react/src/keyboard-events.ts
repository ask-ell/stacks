import { ChangeEvent, KeyboardEvent } from 'react';


export const handleEnterKeyDown =
  (callback: () => void) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

export const handleKeyboardEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: KeyboardEvent<TargetType>) => {
    callback((event.target as any).value as string);
  };

export const handleChangeEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: ChangeEvent<TargetType>) => {
    callback((event.target as any).value as string);
  };