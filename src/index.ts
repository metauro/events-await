import { EventEmitter } from "events";

export type Listener = (...args: any) => void | Promise<void>;

export type AsyncEventOptions = {
  prefix?: string;
};

export class AsyncEventEmitter {
  protected eventEmitter = new EventEmitter();

  constructor(protected readonly options?: AsyncEventOptions) {}

  protected getKey(event: string) {
    const p = this.options?.prefix;
    if (p) {
      return p + event;
    }
    return event;
  }

  off(event: string, listener?: Listener) {
    event = this.getKey(event);
    if (listener) {
      this.eventEmitter.off(event, listener);
    } else {
      this.eventEmitter.removeAllListeners(event);
    }
    return this;
  }

  on(event: string, listener: Listener) {
    event = this.getKey(event);
    this.eventEmitter.on(event, listener);
    return this;
  }

  async emit(event: string, ...args: any) {
    event = this.getKey(event);
    const listeners = this.eventEmitter.listeners(event);
    if (!listeners.length) {
      return false;
    }

    for (const l of listeners) {
      await l(...args);
    }
    return true;
  }
}
