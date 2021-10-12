import { configuration } from "./../config/configuration";
import { ICore } from "../interfaces/core.interface";
import { Cursor } from "./cursor";

export class Pointer extends Cursor {
  protected color = configuration.color.pointer;

  constructor(protected core: ICore) {
    super(core);
  }

  update() {
    if (this.color !== configuration.color.pointer) {
      this.color = configuration.color.pointer;
    }

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
