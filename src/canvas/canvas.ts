import { Thumb } from "./thumb";
import { Time } from "./time";

import { ICore } from "../interfaces/core.interface";

export class Canvas {
  private time: Time;
  private thumb: Thumb;

  constructor(private core: ICore) {
    core.container.appendChild(core.canvas);

    core.canvas.height = core.image.height + 15;
    core.canvas.width = core.container.offsetWidth;
    core.time.frames = core.canvas.width / core.image.width;

    new ResizeObserver((resize) => {
      core.canvas.width = core.container.offsetWidth;
      core.time.frames = core.canvas.width / core.image.width;
    }).observe(core.container);

    this.thumb = new Thumb();
    this.time = new Time(core);
  }

  init() {
    this.core.context.fillStyle = "#000";

    this.thumb.init();
    this.time.init();
  }

  update() {
    let { width, height } = this.core.canvas;

    this.core.context.clearRect(0, 60, width, height);
    this.core.context.fillRect(0, 0, width, height - 15);

    this.thumb.update();
    this.time.update();
  }

  destroy() {
    this.thumb.destroy();
    this.time.destroy();
  }
}
