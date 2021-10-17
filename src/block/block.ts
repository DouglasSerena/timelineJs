import { configuration } from "./../config/configuration";
import { ICore } from "../interfaces/core.interface";

export class Block {
  protected block = document.createElement("div");
  protected currentColor: string | null = null;
  public range = { start: null, end: null };
  public color = configuration.color.block;

  constructor(protected core: ICore) {
    core.container.appendChild(this.block);

    if (this.color === "@RANDOM") {
      const rint = Math.floor(0x100000000 * Math.random());
      this.color = `${rint & 255},${(rint >> 8) & 255},${(rint >> 16) & 255}`;
    }

    this.block.style.cssText = `
      position: absolute;
      inset: 5px auto auto auto;

      height: ${core.image.height}px;

      background-color: rgb(${this.color}, 0.7);
    `;
  }

  init() {}

  update() {
    if (this.currentColor !== this.color) {
      this.currentColor = this.color;
      this.block.style.cssText += `background-color: rgb(${this.currentColor}, 0.7);`;
    }

    let { start, end } = this.range;

    if (end <= this.core.time.range.start) {
      this.block.hidden = true;
      return;
    }
    let width = this.core.canvas.width;
    let offsetX = 0;

    this.block.hidden = false;

    if (start >= this.core.time.range.start) {
      start = start - this.core.time.range.start;
      let percentOffsetX = (start * 100) / this.core.time.between;
      offsetX = (percentOffsetX * width) / 100;
    }

    if (end < this.core.time.range.end) {
      end = end - this.core.time.range.start;
      let percentOffsetX = (end * 100) / this.core.time.between;
      width = (percentOffsetX * width) / 100 - offsetX;
    }

    this.block.style.cssText += `
      left: ${offsetX}px;
      width: ${width}px;
    `;
  }

  destroy() {}
}
