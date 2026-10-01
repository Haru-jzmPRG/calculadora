import "./style.css";
import { Calculator } from "./Calculator";

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
