import { configuration } from "./../config/configuration";
import { ICore } from "../interfaces/core.interface";
import { Block } from "./block";

export class BlockClip extends Block {
  constructor(protected core: ICore) {
    super(core);

    this.block.style.cssText += `cursor: pointer;background-color: rgb(${configuration.color.blockClip}, 0.7);`;

    this.block.addEventListener("click", this.click);
  }

  update() {
    super.update();
  }

  click = () => {
    this.core.anchors.start.time = this.range.start;
    this.core.anchors.end.time = this.range.end;
  };

  destroy() {
    this.block.remove()
    this.block.removeEventListener("click", this.click);
  }
}
