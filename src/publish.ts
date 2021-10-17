import { Observable, Subject } from "rxjs";

export class Publish {
  private _events = new Map<string, Subject<any>>();

  on<T = unknown>(event: string): Observable<T> {
    if (!this._events.has(event)) {
      this._events.set(event, new Subject());
    }

    return this._events.get(event);
  }

  emit(event: string, data: { [key: string]: any }) {
    if (this._events.has(event)) {
      this._events.get(event).next(data);
    }
  }

  destroy() {
    for (const event in this._events) {
      this._events.get(event).complete();
      this._events.delete(event);
    }
  }
}
