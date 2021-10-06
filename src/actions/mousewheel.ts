import { configuration } from "../config/configuration";
import { ICore } from "../interfaces/core.interface";

export class MouseWheel {
  constructor(private core: ICore) {
    core.container.addEventListener("mousewheel" as any, this.mousewheel);
  }

  private mousewheel = (event: WheelEvent) => {
    event.preventDefault();
    event.ctrlKey ? this.zoomTimeline(event) : this.scrollTimeline(event);
  };

  private scrollTimeline = (event: WheelEvent) => {
    let start =
      this.core.time.range.start +
      (this.core.time.between * (event.deltaY / 50)) / 100;
    this.core.time.range.start = Math.max(Math.min(start, 10000000), 0);
  };

  private zoomTimeline = (event: WheelEvent) => {
    event.preventDefault();
    let { max, min } = configuration.zoom;

    let interval = this.core.time.interval + event.deltaY / 100;
    this.core.time.interval = Math.max(Math.min(interval, max), min);
  };

  public destroy() {
    this.core.container.removeEventListener(
      "mousewheel" as any,
      this.mousewheel
    );
  }
}
