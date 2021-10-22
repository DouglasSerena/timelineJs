if (!window["__DOUGLAS_SERENA__"]) {
  window["__DOUGLAS_SERENA__"] = {};
}

let configuration = window["__DOUGLAS_SERENA__"].configTimelineJs || {
  color: {
    blockAnchor: "129, 199, 132",
    pointer: "129, 199, 132",
    anchor: "129, 199, 132",
    cursor: "129, 199, 132",
    block: "@RANDOM",
    time: "0, 0, 0",
  },
  cursor: {
    slowUpdateTime: 10,
  },
  shortcut: {
    cursor: {
      follow: "g",
      move: "h",
    },
    anchors: {
      start: {
        add: "meta.arrowLeft",
        remove: "shift.arrowLeft",
      },
      end: {
        add: "meta.arrowRight",
        remove: "shift.arrowRight",
      },
      clear: "meta.c",
    },
  },
  zoom: { max: 3600, min: 1, speed: 0.01, rate: 10 },
};

if (!window["__DOUGLAS_SERENA__"].configTimelineJs) {
  window["__DOUGLAS_SERENA__"].configTimelineJs = configuration;
}

export { configuration };
