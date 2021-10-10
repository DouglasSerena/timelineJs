import Timeline from "../src/timeline";

const video = document.querySelector("video");

let timeline = new Timeline(video, document.querySelector("#timelinejs")!);
timeline.init();

timeline.events.on("anchor").subscribe(console.log);
