import { core } from "./../core";
import { Cursor } from "./cursor";

export class Pointer extends Cursor {
  constructor(container: HTMLElement) {
    super(container);
  }

  update() {
    let time = core.video.currentTime;
    let { start, end } = core.time.range;

    if (time >= start && time <= end) {
      if (this.cursor.hidden) {
        this.cursor.hidden = false;
      }
      let percentOffsetX = ((time - start) * 100) / core.time.between;
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

  mousemoving = (event: MouseEvent) => {
    let time = super.mousemoving(event);
    core.video.currentTime = time;

    if (core.video.currentTime >= core.time.range.end) {
      core.time.range.start += core.video.currentTime - core.time.range.end;
    }
    if (core.video.currentTime <= core.time.range.start) {
      core.time.range.start += core.video.currentTime - core.time.range.start;
    }
  };
}
