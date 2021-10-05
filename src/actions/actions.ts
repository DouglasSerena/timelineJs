import { Keyboard } from "./keyboard";
import { MouseWheel } from "./mousewheel";

export class Actions {
  mousewheel: MouseWheel;
  keyboard: Keyboard;

  constructor(private container: HTMLElement) {
    this.mousewheel = new MouseWheel(container);
    this.keyboard = new Keyboard(container);
  }

  destroy() {
    this.mousewheel.destroy();
    this.keyboard.destroy();
  }
}
