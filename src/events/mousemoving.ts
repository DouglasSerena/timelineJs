export class MouseMoving {
  private _press = false;
  private cancelRequestAnimation = 0;

  get press() {
    return this._press;
  }

  constructor(private element: HTMLElement) {
    element.addEventListener("mousedown", this.mousedown);
  }

  private mousemove(event: MouseEvent) {
    this.element.dispatchEvent(new MouseEvent("mousemoving", event));

    if (this._press) {
      cancelAnimationFrame(this.cancelRequestAnimation);
      this.cancelRequestAnimation = requestAnimationFrame(() =>
        this.mousemove(event)
      );
    }
  }
  private mousedown = () => {
    this._press = true;
    const mousemove = (event: MouseEvent) => this.mousemove(event);

    const mouseup = () => {
      this._press = false;
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
      cancelAnimationFrame(this.cancelRequestAnimation);
    };

    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
  };

  destroy() {
    this.element.removeEventListener("mousedown", this.mousedown);
  }
}
