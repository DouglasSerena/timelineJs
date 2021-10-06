import Hls from "hls.js";
import { configuration } from "../src/config/configuration";
import Timeline from "../src/timeline";

const video = document.querySelector("video");

// const hls = new Hls();
// hls.loadSource(video.src);
// hls.attachMedia(video);

let timeline = new Timeline(video, document.querySelector("#timelinejs")!);
timeline.init();

timeline.cut = {
  start: 5.5,
  end: 9,
};
