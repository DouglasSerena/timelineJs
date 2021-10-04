import { ICore } from "./interfaces/core.interface";

const canvas = document.createElement("canvas");

let core: ICore = {
  canvas: canvas,
  context: canvas.getContext("2d")!,
  video: null,
  offsetX: 0,
  time: {
    mod: 0,
    frames: 0,
    between: 0,
    interval: 1,
    range: { start: 0, end: 0 },
  },
  image: { width: 80, height: 60 },
};

/** Proxy do range */
core.time.range = new Proxy(core.time.range, {
  set(target, prop, value, receiver) {
    target[prop] = value;

    if (prop === "start") {
      core.time.mod = target.start % core.time.interval;

      let offsetX = (core.time.mod * 100) / core.time.interval;
      core.offsetX = (core.image.width * offsetX) / 100;

      target.end = target.start + core.time.between;
    }

    return true;
  },
});

/** Proxy do tempo */
core.time = new Proxy(core.time, {
  set(target, prop, value, receiver) {
    target[prop] = value;

    /** Atualizar o tempo entre o range */
    if (["frames", "interval"].includes(prop.toString())) {
      target.between = target.frames * target.interval;
      target.range.end = target.range.start + target.between;
    }

    return true;
  },
});

export { core };
