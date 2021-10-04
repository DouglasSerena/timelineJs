import { Actions } from "./actions/actions";
import { Canvas } from "./canvas/canvas";
import { Pointer } from "./cursor/pointer";
import { core } from "./core";
import { IRange } from "./interfaces/range.interface";
import { IRequest } from "./interfaces/request.interface";
import { Anchor } from "./cursor/anchor";

export default class Timeline implements IRequest {
  private video: HTMLVideoElement;
  private container: HTMLElement;
  private refAnimationFrame: number;

  public cut: IRange = { start: 0, end: 0 };

  private canvas: Canvas;
  private actions: Actions;
  private pointer: Pointer;
  private anchorStart: Anchor;

  constructor(video: HTMLVideoElement | string, container: Element | string) {
    this.video =
      video instanceof HTMLVideoElement ? video : document.querySelector(video);

    core.video = this.video;

    this.container =
      container instanceof Element
        ? (container as HTMLElement)
        : document.querySelector(container);

    this.container.style.cssText += `
      user-select: none;
    `;

    this.anchorStart = new Anchor(this.container);
    this.pointer = new Pointer(this.container);

    this.canvas = new Canvas(this.container);
    this.actions = new Actions(this.container);
  }

  public init() {
    this.canvas.init();
    this.pointer.init();
    this.anchorStart.init();

    this.update();
  }

  public update() {
    this.canvas.update();
    this.pointer.update();
    this.anchorStart.update();

    this.refAnimationFrame = requestAnimationFrame(() => this.update());
  }

  public destroy() {
    this.canvas.destroy();
    this.pointer.destroy();
    this.anchorStart.destroy();
    cancelAnimationFrame(this.refAnimationFrame);
  }
}
