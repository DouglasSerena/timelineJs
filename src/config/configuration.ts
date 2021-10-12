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
      follow: "f1",
      move: "f2",
    },
    anchors: {
      start: {
        add: "a",
        remove: "meta.a",
      },
      end: {
        add: "z",
        remove: "meta.z",
      },
      clear: "meta.c",
    },
  },
  zoom: { max: 60, min: 1 },
};

if (!window["__DOUGLAS_SERENA__"].configTimelineJs) {
  window["__DOUGLAS_SERENA__"].configTimelineJs = configuration;
}

export { configuration };
