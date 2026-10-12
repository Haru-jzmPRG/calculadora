import "./style.css";
import { Calculator } from "./calculator/calculator";
import { Stopwatch } from "./stopwatch/stopwatch";
import { Timer } from "./timer/timer";
import { Clock } from "./clock/clock";
import calculatorHTML from "./calculator/calculator.html?raw";

const calculatorContainer = document.querySelector(
  "#calculator-container",
) as HTMLDivElement;

const addCalculatorButton = document.querySelector(
  "#add-calculator",
) as HTMLButtonElement;

function createCalculator() {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = calculatorHTML;

  const calculatorElement = wrapper.querySelector(".calculator") as HTMLElement;

  calculatorContainer.appendChild(calculatorElement);

  new Calculator(calculatorElement);
}

createCalculator();

addCalculatorButton.addEventListener("click", () => {
  createCalculator();
});

const stopwatchContainer = document.querySelector(
  "#stopwatch-container",
) as HTMLElement;

new Stopwatch(stopwatchContainer);

const timerContainer = document.querySelector(
  "#timer-container",
) as HTMLElement;

new Timer(timerContainer);

const clockContainer = document.querySelector(
  "#clock-container",
) as HTMLElement;

new Clock(clockContainer);
