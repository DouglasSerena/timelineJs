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
  private anchorEnd: Anchor;
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
      padding: 5px 0;
    `;
    this.pointer = new Pointer(this.container);
    this.anchorEnd = new Anchor(this.container);
    this.anchorStart = new Anchor(this.container);

    this.anchorStart.time = 20
    this.anchorEnd.time = 30;

    this.canvas = new Canvas(this.container);
    this.actions = new Actions(this.container);
  }

  public init() {
    this.canvas.init();
    this.pointer.init();
    this.anchorEnd.init();
    this.anchorStart.init();

    this.update();
  }

  public update() {
    this.canvas.update();
    this.pointer.update();
    this.anchorEnd.update();
    this.anchorStart.update();

    this.refAnimationFrame = requestAnimationFrame(() => this.update());
  }

  public destroy() {
    this.canvas.destroy();
    this.pointer.destroy();
    this.anchorEnd.destroy();
    this.anchorStart.destroy();
    cancelAnimationFrame(this.refAnimationFrame);
  }
}
