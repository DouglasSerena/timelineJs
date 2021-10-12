import { configuration } from "./../config/configuration";
import { ICore } from "../interfaces/core.interface";
import { Cursor } from "./cursor";

export class Anchor extends Cursor {
  private _time: Number | null = null;

  constructor(protected core: ICore) {
    super(core);
    this.cursor.style.cssText += `background-color: rgb(${configuration.color.anchor});`;

    let span = document.createElement("span");
    span.style.cssText = `
      position: absolute;
      inset: -2px auto auto 50%;
      transform: translateX(-50%);

      width: 6px;
      height: 6px;

      border-radius: 50%;
      background-color: rgb(${configuration.color.anchor});
    `;

    let spanClone = span.cloneNode() as HTMLSpanElement;
    spanClone.style.cssText += `
      inset: auto auto -3px 50%;
    `;

    this.cursor.appendChild(span);
    this.cursor.appendChild(spanClone);

    Object.defineProperty(this, "time", {
      get: () => this._time,
      set: (value: Number | null) => {
        this._time = value;
        const { start, end } = this.core.anchors;
        this.core.publish.emit("anchor", { start: start.time, end: end.time });
      },
    });
  }

  update() {
    if (this.color !== configuration.color.anchor) {
      this.color = configuration.color.anchor;
      for (let span of this.cursor.querySelectorAll("span") as any) {
        span.style.cssText += `background-color: rgb(${this.color});`;
      }
    }
    super.update();
  }

  mousemoving = (event: MouseEvent) => {
    super.slider(event);
  };
}
