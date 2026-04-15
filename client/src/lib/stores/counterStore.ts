import { makeAutoObservable } from 'mobx';
export default class CounterStore {
    title = 'Counter Store';
    count = 27;
    events: string[] = [
        `Initial count is ${this.count}`
    ]

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count++;
        this.events.push(`Incremented to ${this.count}`);
    }

    decrement() {
        this.count--;
        this.events.push(`Decremented to ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }

}
