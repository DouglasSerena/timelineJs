import { ICore } from "../interfaces/core.interface";
import { Dblclick } from "./dblclick";
import { Keyboard } from "./keyboard";
import { MouseWheel } from "./mousewheel";

export class Actions {
  mousewheel: MouseWheel;
  dblclick: Dblclick;
  keyboard: Keyboard;

  constructor(private core: ICore) {}

  init() {
    this.mousewheel = new MouseWheel(this.core);
    this.dblclick = new Dblclick(this.core);
    this.keyboard = new Keyboard(this.core);
  }

  destroy() {
    this.mousewheel.destroy();
    this.dblclick.destroy();
    this.keyboard.destroy();
  }
}
