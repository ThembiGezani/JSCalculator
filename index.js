document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const equalsButton = document.getElementById('equals');
  const decimalButton = document.getElementById('decimal');
  const clearButton = document.getElementById('clear');

  let currentInput = '0';
  let currentOperator = null;
  let prevInput = '0';
  let isFirstDigitZero = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function handleNumberClick(number) {
    if (currentInput === '0' || isFirstDigitZero) {
      currentInput = number;
      isFirstDigitZero = false;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function performCalculation() {
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(currentInput);

    if (currentOperator === '+') {
      currentInput = (num1 + num2).toString();
    } else if (currentOperator === '-') {
      currentInput = (num1 - num2).toString();
    } else if (currentOperator === '*') {
      currentInput = (num1 * num2).toString();
    } else if (currentOperator === '/') {
      currentInput = (num1 / num2).toString();
    }

    currentOperator = null;
    prevInput = '0';
  }

  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentOperator) {
        performCalculation();
      }
      prevInput = currentInput;
      currentInput = '0';
      currentOperator = button.textContent;
    });
  });

  equalsButton.addEventListener('click', () => {
    if (currentOperator) {
      performCalculation();
      updateDisplay();
    }
  });

  decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  });

  clearButton.addEventListener('click', () => {
    currentInput = '0';
    currentOperator = null;
    prevInput = '0';
    isFirstDigitZero = false;
    updateDisplay();
  });

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleNumberClick(button.textContent);
    });
  });

  updateDisplay();
});
