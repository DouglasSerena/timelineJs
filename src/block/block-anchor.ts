import { configuration } from "./../config/configuration";
import { MouseMoving } from "../events/mousemoving";
import { ICore } from "../interfaces/core.interface";
import { getTimeRaw, scrollSides } from "../utils";
import { Block } from "./block";

export class BlockAnchor extends Block {
  private mouseMoving: MouseMoving;
  private incrementTime = 0;

  constructor(protected core: ICore) {
    super(core);

    this.block.style.cssText += `cursor: grab;background-color: rgb(${configuration.color.blockAnchor}, 0.7);z-index: 1;`;

    this.mouseMoving = new MouseMoving(this.block);

    this.block.addEventListener("mouseup", this.mouseup);
    this.block.addEventListener("mousedown", this.mousedown);
    this.block.addEventListener("mousemoving" as any, (event) =>
      this.mousemoving(event)
    );
  }

  update() {
    if (this.color !== configuration.color.blockAnchor) {
      this.color = configuration.color.blockAnchor;
    }

    this.range.start = this.core.anchors.start.time;
    this.range.end = this.core.anchors.end.time;

    super.update();
  }

  mousedown = (event: MouseEvent) => {
    let timeRaw = getTimeRaw(event, this.core);
    this.block.style.cssText += `cursor: grabbing;`;
    document.body.style.cssText += `cursor: grabbing;`;

    this.incrementTime =
      this.core.time.range.start + timeRaw - this.range.start;
  };

  mouseup = () => {
    this.block.style.cssText += `cursor: grab;`;
    document.body.style.removeProperty("cursor");
  };

  mousemoving(event: MouseEvent) {
    let timeRaw = getTimeRaw(event, this.core);
    let time = this.core.time.range.start + timeRaw - this.incrementTime;
    let between = this.range.end - this.range.start;

    if (time <= 0) time = 0;
    if (time >= this.core.video.duration - between) {
      time = this.core.video.duration - between;
    }

    this.core.anchors.start.time = time;
    this.core.anchors.end.time = time + between;

    scrollSides(
      { start: this.core.anchors.start.time, end: this.core.anchors.end.time },
      this.core
    );
  }

  destroy() {
    this.mouseMoving.destroy();
    this.block.removeEventListener("mouseup", this.mouseup);
    this.block.removeEventListener("mousedown", this.mousedown);
  }
}
