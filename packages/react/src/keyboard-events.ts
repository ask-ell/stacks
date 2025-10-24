import { ChangeEvent, KeyboardEvent } from 'react';

// TODO_: https://ask-ell.atlassian.net/browse/FACTORY-46
export const handleEnterKeyDown =
  (callback: () => void) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

// TODO_: https://ask-ell.atlassian.net/browse/FACTORY-46
export const handleKeyboardEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: KeyboardEvent<TargetType>) => {
    callback((event.target as any).value as string);
  };

export const handleChangeEvent =
  (callback: (fieldValue: string) => void) => <TargetType>(event: ChangeEvent<TargetType>) => {
    callback((event.target as any).value as string);
  };