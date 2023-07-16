import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()

export class SubscribeManager implements OnDestroy {
    public subscriptions: Subscription[] = [];

    constructor() { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}