import { ICore } from "../interfaces/core.interface";
import { Keyboard } from "./keyboard";
import { MouseWheel } from "./mousewheel";

export class Actions {
  mousewheel: MouseWheel;
  keyboard: Keyboard;

  constructor(private core: ICore) {}

  init() {
    this.mousewheel = new MouseWheel(this.core);
    this.keyboard = new Keyboard(this.core);
  }

  destroy() {
    this.mousewheel.destroy();
    this.keyboard.destroy();
  }
}
