import { configuration } from "../config/configuration";
import { MouseMoving } from "../events/mousemoving";
import { ICore } from "../interfaces/core.interface";
import { calcTimeRaw } from "../utils";
import { Block } from "./block";

export class BlockAnchor extends Block {
  private mouseMoving: MouseMoving;
  private incrementTime = 0;

  constructor(protected core: ICore) {
    super(core);

    this.mouseMoving = new MouseMoving(this.block);

    this.block.addEventListener("mousedown", this.mousedown);
    this.block.addEventListener("mousemoving" as any, (event) =>
      this.mousemoving(event)
    );
  }

  update() {
    this.range.start = this.core.anchors.start.time;
    this.range.end = this.core.anchors.end.time;

    super.update();
  }

  mousedown = (event: MouseEvent) => {
    let timeRaw = calcTimeRaw(event, this.core);

    this.incrementTime =
      this.core.time.range.start + timeRaw - this.range.start;
  };

  mousemoving(event: MouseEvent) {
    let timeRaw = calcTimeRaw(event, this.core);
    let time = this.core.time.range.start + timeRaw - this.incrementTime;
    let between = this.range.end - this.range.start;

    if (time <= 0) time = 0;
    if (time >= this.core.video.duration - between) {
      time = this.core.video.duration - between;
    }

    this.core.anchors.start.time = time;
    this.core.anchors.end.time = time + between;

    if (this.core.anchors.start.time <= this.core.time.range.start) {
      this.core.time.range.start +=
        this.core.anchors.start.time - this.core.time.range.start;
    }
    if (this.core.anchors.end.time >= this.core.time.range.end) {
      this.core.time.range.start +=
        this.core.anchors.end.time - this.core.time.range.end;
    }
  }

  destroy() {
    this.mouseMoving.destroy();
    this.block.removeEventListener("mousedown", this.mousedown);
  }
}
