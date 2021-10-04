import { configuration } from "../config/configuration";
import { Cursor } from "./cursor";

export class Anchor extends Cursor {
  constructor(container: HTMLElement) {
    super(container);

    let span = document.createElement("span");
    span.style.cssText = `
      position: absolute;
      inset: -3px auto auto 50%;
      transform: translateX(-50%);

      width: 6px;
      height: 6px;

      border-radius: 50%;
      background-color: rgb(${configuration.cursor.color});
    `;

    let spanClone = span.cloneNode() as HTMLSpanElement;
    spanClone.style.cssText += `
      inset: auto auto -3px 50%;
    `;

    this.cursor.appendChild(span);
    this.cursor.appendChild(spanClone);
  }

  update() {
    super.update();
  }

  mousemoving = (event: MouseEvent) => {
    super.mousemoving(event);
  }
}
