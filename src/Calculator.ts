export class Calculator {
  currentInput: string;
  previousInput: string;
  operation: string;
  waitingForNewNumber: boolean;

  root: HTMLElement;
  screen: HTMLDivElement;

  constructor(root: HTMLElement) {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = "";
    this.waitingForNewNumber = false;

    this.root = root;
    this.screen = this.root.querySelector(".screen") as HTMLDivElement;

    this.addEventListeners();
    this.updateScreen();
  }

  updateScreen() {
    this.screen.textContent = this.currentInput || "0";
  }

  clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = "";
    this.waitingForNewNumber = false;

    this.updateScreen();
  }

  delete() {
    this.currentInput = this.currentInput.slice(0, -1);
    this.updateScreen();
  }

  percent() {
    const currentNumber = this.currentInput ? Number(this.currentInput) : 0;

    const result = currentNumber / 100;

    this.currentInput = result.toString();
    this.updateScreen();
  }

  inputNumber(value: string) {
    if (this.waitingForNewNumber) {
      if (value === ".") {
        this.currentInput = "0.";
      } else {
        this.currentInput = value;
      }

      this.waitingForNewNumber = false;
      this.updateScreen();
      return;
    }

    if (this.currentInput === "" && value === ".") {
      this.currentInput = "0.";
      this.updateScreen();
      return;
    }

    if (this.currentInput === "0" && value === "0") {
      return;
    }

    if (value === "." && this.currentInput.includes(".")) {
      return;
    }

    this.currentInput += value;
    this.updateScreen();
  }

  chooseOperation(operation: string) {
    this.previousInput = this.currentInput;
    this.operation = operation;
    this.waitingForNewNumber = true;
  }

  calculate() {
    const previousNumber = Number(this.previousInput);
    const currentNumber = Number(this.currentInput);

    let result: number;

    switch (this.operation) {
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
          throw new Error("Division by zero");
        }

        result = previousNumber / currentNumber;
        break;

      default:
        return;
    }

    this.currentInput = Number(result.toFixed(2)).toString();
    this.waitingForNewNumber = true;

    this.updateScreen();
  }

  addEventListeners() {
    const numberButtons = this.root.querySelectorAll(
      "[data-number]",
    ) as NodeListOf<HTMLButtonElement>;

    const operationButtons = this.root.querySelectorAll(
      "[data-operation]",
    ) as NodeListOf<HTMLButtonElement>;

    const actionButtons = this.root.querySelectorAll(
      "[data-action]",
    ) as NodeListOf<HTMLButtonElement>;

    for (const button of numberButtons) {
      button.addEventListener("click", () => {
        const value = button.dataset.number;

        if (value === undefined) return;

        this.inputNumber(value);
      });
    }

    for (const button of operationButtons) {
      button.addEventListener("click", () => {
        const operation = button.dataset.operation;

        if (operation === undefined) return;

        this.chooseOperation(operation);
      });
    }

    for (const button of actionButtons) {
      button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "clear") {
          this.clear();
        }

        if (action === "delete") {
          this.delete();
        }

        if (action === "percent") {
          this.percent();
        }

        if (action === "calculate") {
          try {
            this.calculate();
          } catch {
            this.screen.textContent = "Error";
          }
        }
      });
    }
  }
}
