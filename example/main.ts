import Hls from "hls.js";
import timelineJs from "../src/timelineJs";

const video = document.querySelector("video");

const hls = new Hls();
hls.loadSource(
  "https://duyu-record-bucket.s3.amazonaws.com/R%C3%A1dio_Verdinha_AM_810/2021/10/15/6168eeb04eae2000019b5a6b/6168eeb04eae2000019b5a6b.m3u8"
);
hls.attachMedia(video);

let timeline = new timelineJs(video, document.querySelector("#timelinejs")!);
timeline.init();
timeline.setInterval(600);
timeline.setClips([
  { start: 10, end: 15, color: "12,52,63" },
  { start: 17, end: 21, color: "12,52,63" },
]);
timeline.setClips([
  { start: 9, end: 10, color: "12,52,63" },
  { start: 11, end: 21, color: "12,52,63" },
]);

let cut = timeline.cut;

let count = 10;
setInterval(() => {
  count++;
  cut.end = count;
}, 2000);
