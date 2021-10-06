import { OnEvent, Shortcut, Utils } from "@douglas-serena/decorators";
import { configuration } from "../config/configuration";
import { ICore } from "../interfaces/core.interface";

@Utils()
export class Keyboard {
  constructor(private core: ICore) {}

  @Shortcut(configuration.shortcut.anchors.start.add)
  addAnchorStart() {
    this.core.anchors.start.time = this.core.video.currentTime;
  }

  @Shortcut(configuration.shortcut.anchors.start.remove)
  removeAnchorStart() {
    this.core.anchors.start.time = null;
  }

  @Shortcut(configuration.shortcut.anchors.end.add)
  addAnchorEnd() {
    this.core.anchors.end.time = this.core.video.currentTime;
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
