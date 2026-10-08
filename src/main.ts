import "./style.css";
import { Calculator } from "./Calculator";
import { Stopwatch } from "./Stopwatch";

const calculatorContainer = document.querySelector(
  "#calculator-container",
) as HTMLDivElement;

const addCalculatorButton = document.querySelector(
  "#add-calculator",
) as HTMLButtonElement;

const calculatorTemplate = document.querySelector(
  "#calculator-template",
) as HTMLTemplateElement;

function createCalculator() {
  const clone = calculatorTemplate.content.cloneNode(true) as DocumentFragment;

  const calculatorElement = clone.querySelector(".calculator") as HTMLElement;

  calculatorContainer.appendChild(clone);

  new Calculator(calculatorElement);
}

createCalculator();

addCalculatorButton.addEventListener("click", () => {
  createCalculator();
});

const stopwatch = new Stopwatch();

const startBtn = document.querySelector(
  ".startBtn-stopwatch",
) as HTMLButtonElement;
startBtn.addEventListener("click", () => {
  stopwatch.playStopwatch();
});

const stopBtn = document.querySelector(
  ".stopBtn-stopwatch",
) as HTMLButtonElement;
stopBtn.addEventListener("click", () => {
  stopwatch.stopStopwatch();
});

const resetBtn = document.querySelector(
  ".resetBtn-stopwatch",
) as HTMLButtonElement;
resetBtn.addEventListener("click", () => {
  stopwatch.resetStopwatch();
});
