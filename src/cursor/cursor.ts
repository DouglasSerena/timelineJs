import { configuration } from "./../config/configuration";
import { core } from "./../core";

import { MouseMoving } from "../events/mousemoving";

export class Cursor {
  private mouseMoving: MouseMoving;
  protected cursor = document.createElement("div");
  public time = null;

  constructor(container: HTMLElement) {
    container.appendChild(this.cursor);
    this.cursor.style.cssText = `
      position: absolute;
      inset: 5px auto auto auto;

      width: 3px;
      height: ${core.image.height}px;

      border-radius: 5px;
      background-color: rgb(${configuration.cursor.color});

      cursor: e-resize;
    `;

    this.mouseMoving = new MouseMoving(this.cursor);

    this.cursor.addEventListener("mousemoving" as any, (event) =>
      this.mousemoving(event)
    );
  }

  init() {}
  update() {
    if (typeof this.time !== "number") {
      this.cursor.hidden = true;
      return;
    }

    let { start, end } = core.time.range;

    if (this.time >= start && this.time <= end) {
      if (this.cursor.hidden) {
        this.cursor.hidden = false;
      }
      let percentOffsetX = ((this.time - start) * 100) / core.time.between;
      let offsetX = (percentOffsetX * core.canvas.width) / 100;

      if (offsetX <= 0) offsetX = 0;
      if (offsetX >= core.canvas.width - 3) offsetX = core.canvas.width - 3;

      this.cursor.style.left = `${offsetX}px`;
    } else {
      if (!this.cursor.hidden) {
        this.cursor.hidden = true;
      }
    }
  }

  mousemoving = (event: MouseEvent) => {};

  slider(event: MouseEvent): any {
    let { left, width } = core.canvas.getBoundingClientRect();
    let offsetX = event.x - left;
    if (offsetX < 0) {
      offsetX = offsetX / configuration.cursor.slowUpdateTime;
    }
    if (offsetX > width) {
      offsetX = width + (offsetX - width) / configuration.cursor.slowUpdateTime;
    }

    let percentOffsetX = (offsetX * 100) / width;
    let timeRaw = (core.time.between * percentOffsetX) / 100;
    this.time = core.time.range.start + timeRaw;

    if (this.time >= core.time.range.end) {
      core.time.range.start += this.time - core.time.range.end;
    }
    if (this.time <= core.time.range.start) {
      core.time.range.start += this.time - core.time.range.start;
    }
  }

  destroy() {
    this.mouseMoving.destroy();
  }
}
