import { interval } from "rxjs";
import clockHTML from "./clock.html?raw";

export class Clock {
  private screen: HTMLElement;

  constructor(container: HTMLElement) {
    container.innerHTML = clockHTML;

    this.screen = container.querySelector(".display-clock") as HTMLElement;

    this.updateScreen();

    interval(1000).subscribe(() => {
      this.updateScreen();
    });
  }

  updateScreen() {
    const now = new Date(Date.now());

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    this.screen.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
