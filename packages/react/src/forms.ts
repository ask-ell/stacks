import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export enum SubmitMode {
    ON_TRIGGER,
    AUTOMATIC
}

export type ErrorSetter<FormData> = (key: keyof FormData) => (errorMessage: string) => void;

export type OnSubmitCallbackParams<FormData> = {
    formData: FormData;
    appendError: ErrorSetter<FormData>;
};

export type OnSubmitCallback<FormData> = (params: OnSubmitCallbackParams<FormData>) => void;

export type UseFormParams<FormData> = {
    defaultValue: FormData;
    onSubmit: OnSubmitCallback<FormData>;
    submitMode?: SubmitMode
};

type FormDataFieldUpdater<FormData> = <Key extends keyof FormData>(key: Key) => (value: FormData[Key]) => void;

type SubmitTrigger = () => void;

export type ErrorsMap<FormData> = Map<keyof FormData, string[]>

export type FormController<FormData> = {
    formData: FormData;
    errors: ErrorsMap<FormData>;
    setFormData: Dispatch<SetStateAction<FormData>>;
    updateFormData: FormDataFieldUpdater<FormData>;
    submit: SubmitTrigger;
    reset: () => void;
};

export function useFormController<FormData>({ defaultValue, onSubmit, submitMode }: UseFormParams<FormData>): FormController<FormData> {
    const [formData, setFormData] = useState<FormData>(defaultValue);
    const [errors, setErrors] = useState<ErrorsMap<FormData>>(new Map());

    const appendError: ErrorSetter<FormData> = (key: keyof FormData) => (message: string): void => {
        const existingErrors: string[] = errors.get(key) ?? [];
        existingErrors.push(message);
        errors.set(key, existingErrors);
        setErrors(new Map(errors));
    }

    const prepareOnSubmit = (callback: () => void) => {
        errors.clear()
        setErrors(new Map(errors));
        callback();
    }

    const updateFormData: FormDataFieldUpdater<FormData> = <Key extends keyof FormData>(key: Key) => (value: FormData[Key]) => {
        setTimeout((): void => {
            const newFormData: FormData = {
                ...formData,
                [key]: value
            }
            setFormData(() => newFormData);
            if (submitMode === SubmitMode.AUTOMATIC) {
                prepareOnSubmit(
                    (): void => onSubmit({ formData: newFormData, appendError })
                );
            }
        });
    };

    const submit: SubmitTrigger = (): void => prepareOnSubmit(
        (): void => onSubmit({ formData, appendError })
    );

    const reset = (): void => {
        setFormData(defaultValue)
        errors.clear();
    }

    return {
        formData,
        errors,
        setFormData,
        updateFormData,
        submit,
        reset
    }
}

export const preventDefault = (callback: () => void) => (event: FormEvent): void => {
    event.preventDefault();
    callback();
};