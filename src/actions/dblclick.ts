import { calc } from "@douglas-serena/utils";
import { ICore } from "../interfaces/core.interface";
import { getTimeRaw } from "../utils";

export class Dblclick {
  constructor(private core: ICore) {
    core.canvas.addEventListener("dblclick", this.dblclick);
  }

  private dblclick = (event: MouseEvent) => {
    let timeRaw = getTimeRaw(event, this.core);
    let time = this.core.time.range.start + timeRaw;

    time = calc(time).keepBetween(this.core.video.duration).value;
    this.core.video.currentTime = time;
  };

  public destroy() {
    this.core.container.removeEventListener("dblclick", this.dblclick);
  }
}
