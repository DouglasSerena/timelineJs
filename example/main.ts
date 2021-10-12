import timelineJs from "../src/timelineJs";

const video = document.querySelector("video");

let timeline = new timelineJs(video, document.querySelector("#timelinejs")!);
timeline.init();
timeline.setClips([
  { start: 10, end: 15 },
  { start: 17, end: 21 },
]);
timeline.setClips([
  { start: 9, end: 10 },
  { start: 11, end: 21 },
]);

timeline.events.on("anchor").subscribe(console.log);
