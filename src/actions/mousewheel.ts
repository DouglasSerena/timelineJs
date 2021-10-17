import { configuration } from "./../config/configuration";
import { ICore } from "../interfaces/core.interface";
import { calc } from "@douglas-serena/utils";

export class MouseWheel {
  constructor(private core: ICore) {
    core.container.addEventListener("mousewheel" as any, this.mousewheel);
  }

  private mousewheel = (event: WheelEvent) => {
    event.preventDefault();
    event.ctrlKey ? this.zoomTimeline(event) : this.scrollTimeline(event);
  };

  private scrollTimeline = (event: WheelEvent) => {
    if (this.core.cursor.fallow) return;

    let start =
      this.core.time.range.start +
      (this.core.time.between * (event.deltaY / 50)) / 100;
    let end = this.core.video.duration - this.core.time.between;

    this.core.time.range.start = calc(start).keepBetween(end, 0).value;
  };

  private zoomTimeline = (event: WheelEvent) => {
    event.preventDefault();
    let { max, min, speed, rate } = configuration.zoom;

    speed *= this.core.time.interval / rate;

    let interval = this.core.time.interval + event.deltaY * speed;
    this.core.time.interval = calc(interval).keepBetween(max, min).value;
    this.core.time.range.start = this.core.time.range.start;
  };

  public destroy() {
    this.core.container.removeEventListener(
      "mousewheel" as any,
      this.mousewheel
    );
  }
}
