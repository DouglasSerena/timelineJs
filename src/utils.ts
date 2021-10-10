import { configuration } from "./config/configuration";
import { ICore } from "./interfaces/core.interface";

export function getTimeRaw(event: MouseEvent, core: ICore) {
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

export function scrollSides({ start, end }, core: ICore) {
  core.cursor.fallow = false;
  if (start < core.time.range.start) {
    core.time.range.start += start - core.time.range.start;
  }
  if (end > core.time.range.end) {
    core.time.range.start += end - core.time.range.end;
  }
}
