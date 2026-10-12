import { interval, Subscription } from "rxjs";
import timerHTML from "./timer.html?raw";

export class Timer {
  initialTime: number;
  private endTime: number = 0;
  private remainingTime: number = 0;

  private subscription?: Subscription;
  private screen: HTMLElement;

  buttons: NodeListOf<Element>;
  timerDigits: string;

  constructor(container: HTMLElement) {
    container.innerHTML = timerHTML;

    this.screen = container.querySelector(".display-timer") as HTMLElement;
    this.initialTime = 0;
    this.remainingTime = 0;
    this.timerDigits = "";
    this.updateScreen();

    this.buttons = container.querySelectorAll("button[data-number]");

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (this.subscription) {
          return;
        }

        const digit = button.getAttribute("data-number");

        this.timerDigits = (this.timerDigits + digit).slice(-6);

        this.remainingTime = 0;
        this.initialTime = 0;

        this.updateScreen();
      });
    });

    const playTimer = container.querySelector(
      ".startBtn-timer",
    ) as HTMLButtonElement;
    playTimer.addEventListener("click", () => {
      this.playTimer();
    });

    const stopTimer = container.querySelector(
      ".stopBtn-timer",
    ) as HTMLButtonElement;
    stopTimer.addEventListener("click", () => {
      this.stopTimer();
    });

    const resetTimer = container.querySelector(
      ".resetBtn-timer",
    ) as HTMLButtonElement;
    resetTimer.addEventListener("click", () => {
      this.resetTimer();
    });

    const deleteTimer = container.querySelector(
      ".deleteBtn-timer",
    ) as HTMLButtonElement;

    deleteTimer.addEventListener("click", () => {
      this.deleteTimer();
    });
  }

  playTimer() {
    if (this.subscription) {
      return;
    }

    if (this.remainingTime === 0) {
      const digits = this.timerDigits.padStart(6, "0");

      const seconds = parseInt(digits.slice(-2), 10);
      const minutes = parseInt(digits.slice(-4, -2), 10);
      const hours = parseInt(digits.slice(-6, -4), 10);

      this.initialTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
      this.remainingTime = this.initialTime;
    }

    if (this.remainingTime <= 0) {
      return;
    }

    this.endTime = Date.now() + this.remainingTime;

    this.updateCountdownScreen();

    this.subscription = interval(100).subscribe(() => {
      this.remainingTime = Math.max(0, this.endTime - Date.now());

      if (this.remainingTime <= 0) {
        this.stopTimer();
      }

      this.updateCountdownScreen();
    });
  }

  stopTimer() {
    if (!this.subscription) {
      return;
    }

    this.remainingTime = Math.max(0, this.endTime - Date.now());

    this.subscription.unsubscribe();
    this.subscription = undefined;
  }

  resetTimer() {
    this.stopTimer();

    this.remainingTime = this.initialTime;

    this.updateCountdownScreen();
  }

  updateScreen() {
    const digits = this.timerDigits.padStart(6, "0");

    const seconds = digits.slice(-2);
    const minutes = digits.slice(-4, -2);
    const hours = digits.slice(-6, -4);

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    this.screen.textContent = formattedTime;
  }

  updateCountdownScreen() {
    const totalSeconds = Math.ceil(this.remainingTime / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedHours = hours.toString().padStart(2, "0");

    this.screen.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  deleteTimer() {
    this.stopTimer();

    this.initialTime = 0;
    this.remainingTime = 0;
    this.timerDigits = "";

    this.updateScreen();
  }
}
