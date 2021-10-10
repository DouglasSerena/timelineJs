import { ICore } from "../interfaces/core.interface";
import { Cursor } from "./cursor";

export class Pointer extends Cursor {
  constructor(protected core: ICore) {
    super(core);
  }

  update() {
    this.time = this.core.video.currentTime;
    if (this.core.cursor.fallow) {
      if (this.core.video.currentTime >= this.core.time.range.end) {
        this.core.time.range.start +=
          this.core.video.currentTime - this.core.time.range.end;
      }
      if (this.core.video.currentTime <= this.core.time.range.start) {
        this.core.time.range.start -=
          this.core.time.range.start - this.core.video.currentTime;
      }
    }
    super.update();
  }

  mousemoving = (event: MouseEvent) => {
    super.slider(event);
    this.core.video.currentTime = this.time;
  };
}
