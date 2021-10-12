import TimelineJs from "../dist/timelineJs.umd.js";

const video = document.querySelector("video");

let timeline = new TimelineJs(video, document.querySelector("#timelinejs"));
TimelineJs.configuration({ color: { anchor: "213,12,51" } });
timeline.init();
