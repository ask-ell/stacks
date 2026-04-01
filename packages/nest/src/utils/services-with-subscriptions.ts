import { OnModuleDestroy } from "@nestjs/common";
import { Observable, Subject, takeUntil } from "rxjs";


type ServiceWithSubscriptionsParams = {
    onModuleDestroy?: () => void;
}

export class ServiceWithSubscriptions implements OnModuleDestroy {
    private moduleDestroyed$: Subject<void> = new Subject();

    constructor(private params: ServiceWithSubscriptionsParams = {}) {}

    protected subscribeUntilModuleDestroy<T>(observable: Observable<T>): void {
        observable.pipe(takeUntil(this.moduleDestroyed$)).subscribe();
    }

    onModuleDestroy(): void {
        if(this.params?.onModuleDestroy){
            this.params.onModuleDestroy();
        }
        this.moduleDestroyed$.next();
        this.moduleDestroyed$.complete();
    }
}