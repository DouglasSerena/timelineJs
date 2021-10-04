import { configuration } from "../config/configuration";
import { core } from "../core";

export class Actions {
  constructor(private container: HTMLElement) {
    container.addEventListener("mousewheel" as any, this.mousewheel);
  }

  private mousewheel = (event: WheelEvent) => {
    event.preventDefault();
    event.ctrlKey ? this.zoomTimeline(event) : this.scrollTimeline(event);
  };

  private scrollTimeline = (event: WheelEvent) => {
    let start =
      core.time.range.start + (core.time.between * (event.deltaY / 50)) / 100;
    core.time.range.start = Math.max(Math.min(start, 10000000), 0);
  };

  private zoomTimeline = (event: WheelEvent) => {
    event.preventDefault();
    let { max, min } = configuration.time.range;

    let interval = core.time.interval + event.deltaY / 100;
    core.time.interval = Math.max(Math.min(interval, max), min);
  };

  public destroy() {
    this.container.removeEventListener("mousewheel" as any, this.mousewheel);
  }
}
