import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { core } from "../core";
dayjs.extend(duration);

export class Time {
  constructor() {}

  init() {}
  update() {
    const { width } = core.image;
    const rest = core.time.interval - core.time.mod;
    const time = core.time.range.start + rest;
    let offsetX = core.offsetX;

    core.context.fillStyle = "#000";
    core.context.strokeStyle = "#000";

    const draw = (time: number, index = 0) => {
      // Desenha o tempo de cada frame
      core.context.beginPath();
      core.context.moveTo(index * width - offsetX, 60);
      core.context.lineTo(index * width - offsetX, 70);
      core.context.lineWidth = 1;
      core.context.stroke();
      core.context.font = `10px Roboto, "Helvetica Neue", sans-serif`;

      let text = dayjs
        .duration(Math.floor(time * 1000))
        .format("H:m:ss")
        .replace("0:", "");

      let widthText = core.context.measureText(text).width;

      let offsetXText = index * width;
      offsetXText -= offsetX;
      offsetXText += core.image.width - 4;
      offsetXText -= widthText;

      core.context.fillText(text, offsetXText, 70);

      if (index < core.time.frames) {
        draw(time + core.time.interval, 1 + index);
      }
    };

    draw(time);
  }
  destroy() {}
}
