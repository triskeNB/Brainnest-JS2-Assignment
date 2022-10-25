const operandButtons = document.querySelectorAll("#operand");
const operatorButtons = document.querySelectorAll("#operator");
const equalsButton = document.getElementById("equals");
const backspaceButton = document.getElementById("backspace");
const allClearButton = document.getElementById("all-clear");
const display = document.getElementById("display");
let displayValue = "0";
let firstOperand = "";
let secondOperand = "";
let firstOperator = "";
let secondOperator = "";
let result = "";

document.addEventListener("keydown", (e) => {
    if (
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "0" ||
        e.key === "."
    ) {
        appendOperand(e.key);
    } else if (
        e.key === "/" ||
        e.key === "*" ||
        e.key === "-" ||
        e.key === "+"
    ) {
        chooseOperator(e.key);
    } else if (e.key === "=") {
        equals();
        updateDisplay();
    } else if (e.key === "Backspace") {
        backspace();
    }
});

const clear = () => {
    displayValue = "0";
    firstOperand = "";
    secondOperand = "";
    firstOperator = "";
    secondOperator = "";
    result = "";
};

const backspace = () => {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
};

const appendOperand = (operand) => {
    if (operand === "." && displayValue.includes(".")) return;
    if (!firstOperator) {
        if (displayValue === "0" || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }

    updateDisplay();
};

const chooseOperator = (operator) => {
    if (firstOperator && !secondOperator) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            firstOperator
        );
        displayValue = roundDecimalNumbers(result, 15).toString();
        firstOperand = displayValue;
        result = "";
    } else if (firstOperator && secondOperator) {
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            secondOperator
        );
        secondOperator = operator;
        displayValue = roundDecimalNumbers(result, 15).toString();
        firstOperand = displayValue;
        result = "";
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
};

const operate = (num1, num2, operator) => {
    if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    } else if (operator === "*") {
        return num1 * num2;
    } else if (operator === "/") {
        if (num2 === 0) {
            return "Infinity";
        } else {
            return num1 / num2;
        }
    }
};

const equals = () => {
    if (!firstOperator) {
        displayValue = displayValue;
    } else if (secondOperator) {
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            secondOperator
        );
        if (result === "Infinity") {
            displayValue = "Infinity";
        } else {
            displayValue = roundDecimalNumbers(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = "";
            firstOperator = "";
            secondOperator = "";
            result = "";
        }
    } else {
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            firstOperator
        );
        if (result === "Infinity") {
            displayValue = "Infinity";
        } else {
            displayValue = roundDecimalNumbers(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = "";
            firstOperator = "";
            secondOperator = "";
            result = "";
        }
    }
};

const updateDisplay = () => {
    display.innerText = displayValue;
    if (displayValue.length > 14) {
        display.innerText = displayValue.substring(0, 14);
    }
};
updateDisplay();

const roundDecimalNumbers = (num, length) =>
    parseFloat(Math.round(num + "e" + length) + "e-" + length);

operandButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        appendOperand(e.target.innerText);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        chooseOperator(e.target.innerText);
    });
});

equalsButton.addEventListener("click", () => {
    equals();
    updateDisplay();
});

allClearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
});

backspaceButton.addEventListener("click", () => backspace());
