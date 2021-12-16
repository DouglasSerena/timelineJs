import Hls from "hls.js";
import timelineJs from "../../timelineJs";

const video = document.querySelector("video");

const hls = new Hls();
hls.loadSource(
  "https://duyu-record-bucket.s3.amazonaws.com/R%C3%A1dio_Verdinha_AM_810/2021/10/15/6168eeb04eae2000019b5a6b/6168eeb04eae2000019b5a6b.m3u8"
);
hls.attachMedia(video);

let timeline = new timelineJs(video, document.querySelector("#timelinejs")!);
timeline.init();
