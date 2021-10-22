import { Utils } from "@douglas-serena/decorators";
import {
  getNode,
  IConfigKeyboard,
  keyboardShortcut,
  KeyboardShortcut,
} from "@douglas-serena/utils";
import { configuration } from "../config/configuration";
import { ICore } from "../interfaces/core.interface";

const Shortcut = (shortcut: string, config?: Partial<IConfigKeyboard>) =>
  Utils.decorator(function (key, value) {
    shortcut = getNode(this.SHORTCUTS, shortcut);

    const _ = new KeyboardShortcut(shortcut, {
      ...config,
      listener: value.bind(this),
    });

    return () => _.unbindShortcut();
  });

@Utils()
export class Keyboard {
  SHORTCUTS = configuration.shortcut;

  constructor(private core: ICore) {}

  @Shortcut("cursor.move")
  moveToPointer() {
    let start = this.core.video.currentTime - this.core.time.between / 2;
    let end = this.core.video.duration - this.core.time.between;
    let time = Math.min(start, end);

    this.core.time.range.start = Math.max(time, 0);
  }

  @Shortcut("cursor.follow")
  followPointer() {
    this.core.cursor.fallow = !this.core.cursor.fallow;
  }

  @Shortcut("anchors.start.add")
  addAnchorStart() {
    if (
      this.core.anchors.end.time === null ||
      this.core.anchors.end.time > this.core.video.currentTime
    ) {
      this.core.anchors.start.time = this.core.video.currentTime;
    }
  }

  @Shortcut("anchors.start.remove")
  removeAnchorStart() {
    this.core.anchors.start.time = null;
  }

  @Shortcut("anchors.end.add")
  addAnchorEnd() {
    if (this.core.anchors.start.time < this.core.video.currentTime) {
      this.core.anchors.end.time = this.core.video.currentTime;
    }
  }
  @Shortcut("anchors.end.remove")
  removeAnchorEnd() {
    this.core.anchors.end.time = null;
  }

  @Shortcut("anchors.clear")
  clearAnchors() {
    this.core.anchors.start.time = null;
    this.core.anchors.end.time = null;
  }

  destroy() {}
}
