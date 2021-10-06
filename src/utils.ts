import { configuration } from "./config/configuration";
import { ICore } from "./interfaces/core.interface";

export function calcTimeRaw(event: MouseEvent, core: ICore) {
  let { left, width } = core.canvas.getBoundingClientRect();
  let offsetX = event.x - left;
  if (offsetX < 0) {
    offsetX = offsetX / configuration.cursor.slowUpdateTime;
  }
  if (offsetX > width) {
    offsetX = width + (offsetX - width) / configuration.cursor.slowUpdateTime;
  }

  let percentOffsetX = (offsetX * 100) / width;
  return (core.time.between * percentOffsetX) / 100;
}
