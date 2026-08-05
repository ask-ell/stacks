type SelectEvent = {
    target: {
        value: string;
    }
}

export const handleSelectChange =
    (callback: (data: string) => void) =>
        <T extends SelectEvent>(event: T): void => {
            callback(event.target.value);
    }
