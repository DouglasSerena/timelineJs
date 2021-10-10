import { ICore } from "../interfaces/core.interface";
import { getTimeRaw } from "../utils";

export class Dblclick {
  constructor(private core: ICore) {
    core.canvas.addEventListener("dblclick", this.dblclick);
  }

  private dblclick = (event: MouseEvent) => {
    let timeRaw = getTimeRaw(event, this.core);
    let time = this.core.time.range.start + timeRaw;

    time = Math.max(Math.min(time, this.core.video.duration), 0);
    this.core.video.currentTime = time;
  };

  public destroy() {
    this.core.container.removeEventListener("dblclick", this.dblclick);
  }
}
