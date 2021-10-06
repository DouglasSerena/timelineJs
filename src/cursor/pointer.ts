import { ICore } from "../interfaces/core.interface";
import { Cursor } from "./cursor";

export class Pointer extends Cursor {
  constructor(protected core: ICore) {
    super(core);
  }

  update() {
    this.time = this.core.video.currentTime;
    super.update();
  }

  mousemoving = (event: MouseEvent) => {
    super.slider(event);
    this.core.video.currentTime = this.time;
  };
}
