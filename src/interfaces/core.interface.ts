import { IRange } from "./range.interface";

export interface ICore {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: { width: number; height: number };
  offsetX: number;
  time: {
    mod: number;
    range: IRange;
    between: number;
    frames: number;
    interval: number;
  };
}
