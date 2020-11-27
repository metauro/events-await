import { EventEmitter } from "events";

export type Listener = (...args: any) => void | Promise<void>;

export class AsyncEventEmitter {
  protected eventEmitter = new EventEmitter();

  off(event: string | symbol, listener?: Listener) {
    if (listener) {
      this.eventEmitter.off(event, listener);
    } else {
      this.eventEmitter.removeAllListeners(event);
    }
    return this;
  }

  on(event: string | symbol, listener: Listener) {
    this.eventEmitter.on(event, listener);
    return this;
  }

  async emit(event: string | symbol, ...args: any) {
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
