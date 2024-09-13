import { CustomEvent } from './index.js';

export class EventEmitterLike extends EventTarget {
  #legacy_listeners = new Map<(...args: any[]) => void, EventListener>();

  constructor() {
    super();
  }

  emit(type: string, ...args: any[]) {
    const event = new CustomEvent(type, { detail: args });
    this.dispatchEvent(event);
  }

  on(type: string, listener: (...args: any[]) => void) {
    const wrapper: EventListener = (ev) => {
      if (ev instanceof CustomEvent) {
        listener(...ev.detail as any[]);
      } else {
        listener(ev);
      }
    };
    this.#legacy_listeners.set(listener, wrapper);
    this.addEventListener(type, wrapper);
  }

  once(type: string, listener: (...args: any[]) => void) {
    const wrapper: EventListener = (ev) => {
      if (ev instanceof CustomEvent) {
        listener(...ev.detail as any[]);
      } else {
        listener(ev);
      }
      this.off(type, listener);
    };
    this.#legacy_listeners.set(listener, wrapper);
    this.addEventListener(type, wrapper);
  }

  off(type: string, listener: (...args: any[]) => void) {
    const wrapper = this.#legacy_listeners.get(listener);
    if (wrapper) {
      this.removeEventListener(type, wrapper);
      this.#legacy_listeners.delete(listener);
    }
  }
}