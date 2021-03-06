import { configuration } from "./../config/configuration";

import { MouseMoving } from "../events/mousemoving";
import { ICore } from "../interfaces/core.interface";
import { getTimeRaw, scrollSides } from "../utils";
import { calc } from "@douglas-serena/utils";

export class Cursor {
  protected cursor = document.createElement("div");
  protected color = configuration.color.cursor;
  protected currentColor: string | null = null;

  private mouseMoving: MouseMoving;
  public time = null;

  public max: number | null = null;
  public min: number | null = null;

  constructor(protected core: ICore) {
    core.container.appendChild(this.cursor);

    if (this.color === "@RANDOM") {
      const rint = Math.floor(0x100000000 * Math.random());
      this.color = `${rint & 255},${(rint >> 8) & 255},${(rint >> 16) & 255}`;
    }

    this.cursor.style.cssText = `
      position: absolute;
      inset: 5px auto auto auto;

      width: 3px;
      height: ${core.image.height}px;

      border-radius: 5px;
      background-color: rgb(${configuration.color.cursor});

      z-index: 1;
      cursor: col-resize;
    `;

    this.mouseMoving = new MouseMoving(this.cursor);

    this.cursor.addEventListener("mousemoving" as any, (event) =>
      this.mousemoving(event)
    );
  }

  init() {}
  update() {
    if (this.currentColor !== this.color) {
      this.currentColor = this.color;
      this.cursor.style.cssText += `background-color: rgb(${this.currentColor});`;
    }

    if (typeof this.time !== "number") {
      this.cursor.hidden = true;
      return;
    }

    let { start, end } = this.core.time.range;

    if (this.time >= start && this.time <= end) {
      if (this.cursor.hidden) {
        this.cursor.hidden = false;
      }
      let percentOffsetX = ((this.time - start) * 100) / this.core.time.between;
      let offsetX = (percentOffsetX * this.core.canvas.width) / 100;

      offsetX = calc(offsetX).keepBetween(this.core.canvas.width - 3).value;

      this.cursor.style.left = `${offsetX}px`;
    } else {
      if (!this.cursor.hidden) {
        this.cursor.hidden = true;
      }
    }
  }

  mousemoving = (event: MouseEvent) => {};

  slider(event: MouseEvent): any {
    let timeRaw = getTimeRaw(event, this.core);
    let time = this.core.time.range.start + timeRaw;

    let max = this.max || this.core.video.duration;
    let min = this.min || 0;

    this.time = calc(time).keepBetween(max, min).value;

    scrollSides({ start: this.time, end: this.time }, this.core);
  }

  destroy() {
    this.mouseMoving.destroy();
  }
}
