import { IConfiguration } from "./interfaces/configuration.interface";
import { Canvas } from "./canvas/canvas";
import { Anchor } from "./cursor/anchor";
import { Pointer } from "./cursor/pointer";
import { Actions } from "./actions/actions";
import { BlockAnchor } from "./block/block-anchor";
import { ICore } from "./interfaces/core.interface";
import { IRange } from "./interfaces/range.interface";
import { configuration } from "./config/configuration";
import { IClip } from "./interfaces/clip.interface";
import { BlockClip } from "./block/block-clip";
import { Publish } from "./publish";
import _, { extend } from "lodash";

export default class TimelineJs {
  private core: ICore = {
    canvas: null,
    context: null,
    container: null,
    video: null,
    offsetX: 0,
    cursor: {
      fallow: true,
    },
    image: { width: 80, height: 60 },
    anchors: {
      start: null,
      end: null,
    },
    time: {
      mod: 0,
      frames: 0,
      between: 0,
      interval: 3600,
      range: { start: 0, end: 0 },
      cut: { start: null, end: null },
    },
  } as ICore;

  private refAnimationFrame: number;

  public get cut(): IRange {
    return new Proxy(this.core.time.cut, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.core.anchors[prop].time = value;
        return true;
      },
    });
  }
  public set cut(cut: Partial<IRange>) {
    this.core.anchors.end.time =
      cut.end === undefined ? this.core.anchors.end.time : cut.end;
    this.core.anchors.start.time =
      cut.start === undefined ? this.core.anchors.start.time : cut.start;
  }

  private canvas: Canvas;
  private actions: Actions;

  private pointer: Pointer;
  private blockClips: BlockClip[] = [];
  private blockAnchor: BlockAnchor;

  public events: Publish;

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
      position: relative;
      user-select: none;
      overflow: hidden;
      padding: 5px 0;
    `;

    this.blockAnchor = new BlockAnchor(this.core);
    this.pointer = new Pointer(this.core);
    this.canvas = new Canvas(this.core);
    this.actions = new Actions(this.core);

    this.events = new Publish();
    this.core.publish = this.events;
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
    this.blockClips.forEach((block) => block.update());

    if (this.core.anchors.end.time) {
      this.core.anchors.start.max = this.core.anchors.end.time;
    } else {
      this.core.anchors.start.max = null;
    }

    if (this.core.anchors.start.time) {
      this.core.anchors.end.min = this.core.anchors.start.time;
    } else {
      this.core.anchors.end.min = null;
    }

    this.refAnimationFrame = requestAnimationFrame(() => this.update());
  }

  public destroy() {
    this.canvas.destroy();
    this.actions.destroy();

    this.pointer.destroy();
    this.blockAnchor.destroy();
    this.core.publish.destroy();
    this.core.anchors.end.destroy();
    this.core.anchors.start.destroy();

    this.blockClips.forEach((block, index, blocks) => {
      block.destroy();
      delete blocks[index];
    });

    cancelAnimationFrame(this.refAnimationFrame);
  }

  public clearAnchors() {
    this.core.anchors.start.time = null;
    this.core.anchors.end.time = null;
  }

  public setClips(clips: IClip[]) {
    for (let [index, blockClip] of Object.entries(this.blockClips)) {
      blockClip.destroy();
      delete this.blockClips[index];
    }

    for (let clip of clips) {
      const blockClip = new BlockClip(this.core);
      if (clip.color !== undefined) {
        blockClip.color = clip.color;
        console.log(clip.color, blockClip.color);
      }
      blockClip.range = clip;
      blockClip.init();

      this.blockClips.push(blockClip);
    }
  }

  public setInterval(interval: number) {
    this.core.time.interval = interval;
  }

  public static configuration(config: IConfiguration) {
    extend(configuration, config);
  }
}
