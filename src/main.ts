import "./style.css";

let currentInput: string = "";
let previousInput: string = "";
let operation: string = "";
let waitingForNewNumber: boolean = false;

const screen = document.querySelector("#screen") as HTMLDivElement;
const numberButtons = document.querySelectorAll(
  "[data-number]",
) as NodeListOf<HTMLButtonElement>;
const operationButtons = document.querySelectorAll(
  "[data-operation]",
) as NodeListOf<HTMLButtonElement>;
const actionButtons = document.querySelectorAll(
  "[data-action]",
) as NodeListOf<HTMLButtonElement>;

console.log(screen);
console.log(numberButtons);
console.log(operationButtons);
console.log(actionButtons);

for (const button of numberButtons) {
  button.addEventListener("click", () => {
    const value = button.dataset.number;

    if (value === undefined) return;

    if (currentInput === "" && value === ".") {
      currentInput = "0.";
      screen.textContent = currentInput;
      return;
    }

    if (currentInput === "0" && value === "0") {
      screen.textContent = currentInput;
      return;
    }

    if (value === "." && currentInput.includes(".")) {
      return;
    }

    if (waitingForNewNumber) {
      if (value === ".") {
        currentInput = "0.";
      } else {
        currentInput = value;
      }
      waitingForNewNumber = false;
    } else {
      currentInput += value;
    }
    screen.textContent = currentInput;
  });
}
for (const button of operationButtons) {
  button.addEventListener("click", () => {
    previousInput = currentInput;
    waitingForNewNumber = true;
    operation = button.dataset.operation || "";
  });
}
for (const button of actionButtons) {
  button.addEventListener("click", () => {
    if (button.dataset.action === "calculate") {
      const previousNumber = Number(previousInput);
      const currentNumber = Number(currentInput);

      let result: number;
      switch (operation) {
        case "+":
          result = previousNumber + currentNumber;
          break;
        case "-":
          result = previousNumber - currentNumber;
          break;
        case "*":
          result = previousNumber * currentNumber;
          break;
        case "/":
          if (currentNumber === 0) {
            screen.textContent = "Error: Division by zero";
            return;
          }
          result = previousNumber / currentNumber;
          break;
        default:
          return;
      }
      currentInput = Number(result.toFixed(2)).toString();
      screen.textContent = currentInput;
      waitingForNewNumber = true;
    }

    if (button.dataset.action === "clear") {
      currentInput = "";
      previousInput = "";
      operation = "";
      waitingForNewNumber = false;
      screen.textContent = "0";
    }

    if (button.dataset.action === "delete") {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === "") {
        screen.textContent = "0";
      } else {
        screen.textContent = currentInput;
      }
    }

    if (button.dataset.action === "percent") {
      const currentNumber = Number(currentInput);
      const result = currentNumber / 100;
      currentInput = result.toString();
      screen.textContent = currentInput;
    }
  });
}
