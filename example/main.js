import TimelineJs from "../dist/timelineJs.es5.js";

const video = document.querySelector("video");

let timeline = new TimelineJs(video, document.querySelector("#timelinejs"));
timeline.init();

timeline.events.on("anchor").subscribe(console.log);
