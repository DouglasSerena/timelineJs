import { IRequest } from "../interfaces/request.interface";
import { Thumb } from "./thumb";
import { Time } from "./time";

import { core } from "../core";

export class Canvas implements IRequest {
  private time: Time;
  private thumb: Thumb;

  constructor(container: HTMLElement) {
    container.appendChild(core.canvas);

    core.canvas.height = core.image.height + 15;
    core.canvas.width = container.offsetWidth;
    core.time.frames = core.canvas.width / core.image.width;

    new ResizeObserver((resize) => {
      core.canvas.width = container.offsetWidth;
      core.time.frames = core.canvas.width / core.image.width;
    }).observe(container);

    this.thumb = new Thumb();
    this.time = new Time();
  }

  init() {
    core.context.fillStyle = "#000";

    this.thumb.init();
    this.time.init();
  }

  update() {
    let { width, height } = core.canvas;

    core.context.clearRect(0, 60, width, height);
    core.context.fillRect(0, 0, width, height - 15);

    this.thumb.update();
    this.time.update();
  }

  destroy() {
    this.thumb.destroy();
    this.time.destroy();
  }
}
