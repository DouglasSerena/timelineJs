import { Actions } from "./actions/actions";
import { Canvas } from "./canvas/canvas";
import { Pointer } from "./cursor/pointer";
import { IRange } from "./interfaces/range.interface";
import { IRequest } from "./interfaces/request.interface";
import { Anchor } from "./cursor/anchor";
import { Block } from "./block/block";
import { ICore } from "./interfaces/core.interface";
import { BlockAnchor } from "./block/block-anchor";

export default class Timeline implements IRequest {
  private core: ICore = {
    canvas: null,
    context: null,
    container: null,
    video: null,
    offsetX: 0,
    image: { width: 80, height: 60 },
    anchors: {
      start: null,
      end: null,
    },
    time: {
      mod: 0,
      frames: 0,
      between: 0,
      interval: 1,
      range: { start: 0, end: 0 },
    },
  } as ICore;

  private refAnimationFrame: number;

  public get cut(): IRange {
    return {
      start: this.core.anchors.start.time,
      end: this.core.anchors.end.time,
    };
  }
  public set cut(cut: Partial<IRange>) {
    this.core.anchors.end.time = cut.end || this.core.anchors.end.time;
    this.core.anchors.start.time = cut.start || this.core.anchors.start.time;
  }

  private canvas: Canvas;
  private actions: Actions;

  private pointer: Pointer;
  private blockAnchor: BlockAnchor;

  constructor(video: HTMLVideoElement, container: Element) {
    this.core.canvas = document.createElement("canvas");
    this.core.context = this.core.canvas.getContext("2d")!;
    this.core.container = container as HTMLElement;
    this.core.video = video;

    this.core.time = new Proxy(this.core.time, {
      set: (target, prop, value) => {
        target[prop] = value;

        /** Atualizar o tempo entre o range */
        if (["frames", "interval"].includes(prop.toString())) {
          target.between = target.frames * target.interval;
          target.range.end = target.range.start + target.between;
        }

        return true;
      },
    });

    this.core.time.range = new Proxy(this.core.time.range, {
      set: (target, prop, value) => {
        target[prop] = value;

        if (prop === "start") {
          this.core.time.mod = target.start % this.core.time.interval;

          let offsetX = (this.core.time.mod * 100) / this.core.time.interval;
          this.core.offsetX = (this.core.image.width * offsetX) / 100;

          target.end = target.start + this.core.time.between;
        }

        return true;
      },
    });

    this.core.container.style.cssText += `
      user-select: none;
      padding: 5px 0;
    `;

    this.blockAnchor = new BlockAnchor(this.core);
    this.pointer = new Pointer(this.core);
    this.canvas = new Canvas(this.core);
    this.actions = new Actions(this.core);

    this.core.anchors.start = new Anchor(this.core);
    this.core.anchors.end = new Anchor(this.core);
  }

  public init() {
    this.canvas.init();
    this.actions.init();

    this.pointer.init();
    this.blockAnchor.init();
    this.core.anchors.end.init();
    this.core.anchors.start.init();

    this.update();
  }

  public update() {
    this.canvas.update();

    this.pointer.update();
    this.blockAnchor.update();
    this.core.anchors.end.update();
    this.core.anchors.start.update();

    this.refAnimationFrame = requestAnimationFrame(() => this.update());
  }

  public destroy() {
    this.canvas.destroy();
    this.actions.destroy();

    this.pointer.destroy();
    this.blockAnchor.destroy();
    this.core.anchors.end.destroy();
    this.core.anchors.start.destroy();

    cancelAnimationFrame(this.refAnimationFrame);
  }
}
