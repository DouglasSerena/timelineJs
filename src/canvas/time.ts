import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { ICore } from "../interfaces/core.interface";
dayjs.extend(duration);

export class Time {
  constructor(private core: ICore) {}

  init() {}
  update() {
    const { width } = this.core.image;
    const rest = this.core.time.interval - this.core.time.mod;
    const time = this.core.time.range.start + rest;
    let offsetX = this.core.offsetX;

    this.core.context.fillStyle = "#000";
    this.core.context.strokeStyle = "#000";

    const draw = (time: number, index = 0) => {
      // Desenha o tempo de cada frame
      this.core.context.beginPath();
      this.core.context.moveTo(index * width - offsetX, 60);
      this.core.context.lineTo(index * width - offsetX, 70);
      this.core.context.lineWidth = 1;
      this.core.context.stroke();
      this.core.context.font = `10px Roboto, "Helvetica Neue", sans-serif`;

      let text = dayjs
        .duration(Math.floor(time * 1000))
        .format("H:m:ss")
        .replace("0:", "");

      let widthText = this.core.context.measureText(text).width;

      let offsetXText = index * width;
      offsetXText -= offsetX;
      offsetXText += this.core.image.width - 4;
      offsetXText -= widthText;

      this.core.context.fillText(text, offsetXText, 70);

      if (index < this.core.time.frames) {
        draw(time + this.core.time.interval, 1 + index);
      }
    };

    draw(time);
  }
  destroy() {}
}
