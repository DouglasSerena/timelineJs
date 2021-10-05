import { OnEvent, Shortcut, Utils } from "@douglas-serena/decorators";
import { configuration } from "../config/configuration";

@Utils()
export class Keyboard {
  constructor(container: HTMLElement) {}

  @Shortcut(configuration.shortcut.anchors.start.add, {})
  addAnchorStart() {}

  @Shortcut(configuration.shortcut.anchors.start.remove)
  removeAnchorStart() {
    console.log(this);
  }

  @Shortcut(configuration.shortcut.anchors.end.add)
  addAnchorEnd() {
    console.log(this);
  }
  @Shortcut(configuration.shortcut.anchors.end.remove)
  removeAnchorEnd() {
    console.log(this);
  }

  @Shortcut(configuration.shortcut.anchors.clear)
  clearAnchors() {
    console.log(this);
  }

  destroy() {}
}
