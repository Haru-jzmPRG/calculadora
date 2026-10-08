import { interval, Subscription } from "rxjs";

export class Stopwatch {
  elapsedTime = 0;
  private subscription?: Subscription;
  private screen: HTMLElement;

  constructor() {
    this.elapsedTime = 0;
    this.screen = document.querySelector(".display-stopwatch") as HTMLElement;
  }

  playStopwatch() {
    if (this.subscription) {
      return;
    }

    this.subscription = interval(1000).subscribe(() => {
      this.elapsedTime += 1;
      this.updateScreen();
    });
  }

  stopStopwatch() {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }

  resetStopwatch() {
    this.stopStopwatch();
    this.elapsedTime = 0;
    this.updateScreen();
  }

  updateScreen() {
    this.screen.textContent = this.elapsedTime.toString();
    const seconds = this.elapsedTime % 60;
    const minutes = Math.floor(this.elapsedTime / 60) % 60;
    const hours = Math.floor(this.elapsedTime / 3600);

    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedHours = hours.toString().padStart(2, "0");

    this.screen.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
