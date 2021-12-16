import timelineJs from "../../timelineJs";

const video = document.querySelector("video");

let timeline = new timelineJs(video, document.querySelector("#timelinejs")!);
timeline.init();
