export const configuration = {
  block: {
    color: "129, 199, 132",
  },
  cursor: {
    color: "129, 199, 132",
    slowUpdateTime: 10,
  },
  shortcut: {
    cursor: {
      follow: 'meta.f',
      move: 'meta.m'
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
