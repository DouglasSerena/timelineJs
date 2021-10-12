import { Shortcut, Utils } from "@douglas-serena/decorators";
import { configuration } from "../config/configuration";
import { ICore } from "../interfaces/core.interface";

@Utils()
export class Keyboard {
  constructor(private core: ICore) {}

  @Shortcut(configuration.shortcut.cursor.move)
  moveToPointer() {
    let start = this.core.video.currentTime - this.core.time.between / 2;
    let end = this.core.video.duration - this.core.time.between;
    let time = Math.min(start, end);

    this.core.time.range.start = Math.max(time, 0);
  }

  @Shortcut(configuration.shortcut.cursor.follow)
  followPointer() {
    this.core.cursor.fallow = !this.core.cursor.fallow;
  }

  @Shortcut(configuration.shortcut.anchors.start.add)
  addAnchorStart() {
    if (
      this.core.anchors.end.time === null ||
      this.core.anchors.end.time > this.core.video.currentTime
    ) {
      this.core.anchors.start.time = this.core.video.currentTime;
    }
  }

  @Shortcut(configuration.shortcut.anchors.start.remove)
  removeAnchorStart() {
    this.core.anchors.start.time = null;
  }

  @Shortcut(configuration.shortcut.anchors.end.add)
  addAnchorEnd() {
    if (this.core.anchors.start.time < this.core.video.currentTime) {
      this.core.anchors.end.time = this.core.video.currentTime;
    }
  }
  @Shortcut(configuration.shortcut.anchors.end.remove)
  removeAnchorEnd() {
    this.core.anchors.end.time = null;
  }

  @Shortcut(configuration.shortcut.anchors.clear)
  clearAnchors() {
    this.core.anchors.start.time = null;
    this.core.anchors.end.time = null;
  }

  destroy() {}
}
