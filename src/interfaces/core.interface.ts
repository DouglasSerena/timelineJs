import { Anchor } from "../cursor/anchor";
import { Publish } from "../publish";
import { IRange } from "./range.interface";

export interface ICore {
  container: HTMLElement;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: { width: number; height: number };
  offsetX: number;
  publish: Publish;
  cursor: {
    fallow: boolean;
  };
  anchors: {
    start: Anchor;
    end: Anchor;
  };
  time: {
    mod: number;
    range: IRange;
    between: number;
    frames: number;
    interval: number;
  };
}
