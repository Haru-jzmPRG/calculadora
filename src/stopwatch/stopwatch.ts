import { interval, Subscription } from "rxjs";
import stopwatchHTML from "./stopwatch.html?raw";

export class Stopwatch {
  private subscription?: Subscription;
  private screen: HTMLElement;
  private startTime: number = 0;
  private elapsedTime: number = 0;

  constructor(container: HTMLElement) {
    container.innerHTML = stopwatchHTML;

    this.screen = container.querySelector(".display-stopwatch") as HTMLElement;

    this.updateScreen();

    const startBtn = container.querySelector(
      ".startBtn-stopwatch",
    ) as HTMLButtonElement;
    startBtn.addEventListener("click", () => {
      this.playStopwatch();
    });

    const stopBtn = container.querySelector(
      ".stopBtn-stopwatch",
    ) as HTMLButtonElement;
    stopBtn.addEventListener("click", () => {
      this.stopStopwatch();
    });

    const resetBtn = container.querySelector(
      ".resetBtn-stopwatch",
    ) as HTMLButtonElement;
    resetBtn.addEventListener("click", () => {
      this.resetStopwatch();
    });
  }

  playStopwatch() {
    if (this.subscription) {
      return;
    }

    this.startTime = Date.now();

    this.subscription = interval(10).subscribe(() => {
      this.updateScreen();
    });
  }

  stopStopwatch() {
    if (!this.subscription) {
      return;
    }

    this.elapsedTime += Date.now() - this.startTime;

    this.subscription.unsubscribe();
    this.subscription = undefined;

    this.updateScreen();
  }

  resetStopwatch() {
    this.stopStopwatch();
    this.elapsedTime = 0;
    this.updateScreen();
  }

  updateScreen() {
    const totalTime = this.subscription
      ? this.elapsedTime + (Date.now() - this.startTime)
      : this.elapsedTime;

    const miliseconds = totalTime % 1000;
    const seconds = Math.floor(totalTime / 1000) % 60;
    const minutes = Math.floor(totalTime / 60000) % 60;
    const hours = Math.floor(totalTime / 3600000);

    const formattedMiliseconds = miliseconds.toString().padStart(3, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedHours = hours.toString().padStart(2, "0");

    this.screen.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMiliseconds}`;
  }
}
