import { core } from "./../core";
import { Cursor } from "./cursor";

export class Pointer extends Cursor {
  constructor(container: HTMLElement) {
    super(container);
  }

  update() {
    this.time = core.video.currentTime;
    super.update();
  }

  mousemoving = (event: MouseEvent) => {
    super.slider(event);
    core.video.currentTime = this.time;
  };
}
