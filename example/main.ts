import Hls from "hls.js";
import Timeline from "../src/timeline";

const video = document.querySelector("video");

const hls = new Hls();
hls.loadSource(video.src);
hls.attachMedia(video);

new Timeline(video, document.querySelector("#timelinejs")!).init();
