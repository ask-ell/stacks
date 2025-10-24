export const handleSelectChange =
    (callback: (data: string) => void) =>
        <T>(event: T): void => {
            callback((event as any).target.value);
    };