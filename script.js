const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let shouldResetDisplay = false;
let currentExpression = '';

function inputNumber(num) {
  if (shouldResetDisplay) {
    currentExpression = '';
    shouldResetDisplay = false;
  }
  
  if (waitingForSecondOperand) {
    waitingForSecondOperand = false;
  }
  
  if (display.textContent === '0' && currentExpression === '') {
    currentExpression = num;
  } else {
    currentExpression += num;
  }
  
  display.textContent = currentExpression;
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentExpression = '0.';
    shouldResetDisplay = false;
  } else if (waitingForSecondOperand) {
    currentExpression += '0.';
    waitingForSecondOperand = false;
  } else if (!currentExpression.includes('.')) {
    currentExpression += '.';
  }
  
  display.textContent = currentExpression;
}

function clearDisplay() {
  display.textContent = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  shouldResetDisplay = false;
  currentExpression = '';
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(getCurrentNumber());
  
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    currentExpression = currentExpression.slice(0, -1) + getOperatorSymbol(nextOperator);
    display.textContent = currentExpression;
    return;
  }
  
  if (firstOperand == null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);
    firstOperand = result;
    currentExpression = String(result);
    shouldResetDisplay = true;
  }
  
  operator = nextOperator;
  waitingForSecondOperand = true;
  currentExpression += getOperatorSymbol(nextOperator);
  display.textContent = currentExpression;
}

function getOperatorSymbol(op) {
  switch (op) {
    case 'add':
      return '+';
    case 'subtract':
      return '−';
    case 'multiply':
      return '×';
    case 'divide':
      return '÷';
    default:
      return '';
  }
}

function getCurrentNumber() {
  const parts = currentExpression.split(/[+\-×÷]/);
  return parts[parts.length - 1];
}

function operate(a, b, op) {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return b === 0 ? 'Error' : a / b;
    default:
      return b;
  }
}

function inputPercent() {
  const currentNum = getCurrentNumber();
  const percentValue = parseFloat(currentNum) / 100;
  currentExpression = currentExpression.replace(currentNum, String(percentValue));
  display.textContent = currentExpression;
}

function plusMinus() {
  const currentNum = getCurrentNumber();
  const negatedValue = parseFloat(currentNum) * -1;
  currentExpression = currentExpression.replace(currentNum, String(negatedValue));
  display.textContent = currentExpression;
}

function backspace() {
  if (currentExpression === 'Error') {
    currentExpression = '';
    display.textContent = '0';
    return;
  }

  if (currentExpression.length === 1) {
    currentExpression = '';
    display.textContent = '0';
  } else {
    currentExpression = currentExpression.slice(0, -1);
    display.textContent = currentExpression || '0';
  }
}

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('number')) {
      const num = btn.getAttribute('data-number');
      if (num === '.') {
        inputDecimal();
      } else {
        inputNumber(num);
      }
    } else if (btn.classList.contains('operator')) {
      const action = btn.getAttribute('data-action');
      if (action === 'equals') {
        if (operator && firstOperand != null && !waitingForSecondOperand) {
          const inputValue = parseFloat(display.textContent);
          const result = operate(firstOperand, inputValue, operator);
          display.textContent = String(result);
          firstOperand = result;
          operator = null;
          waitingForSecondOperand = false;
          shouldResetDisplay = true;
        }
      } else {
        handleOperator(action);
      }
    } else if (btn.classList.contains('function')) {
      const action = btn.getAttribute('data-action');
      if (action === 'all-clear') {
        clearDisplay();
      } else if (action === 'clear') {
        backspace();
      } else if (action === 'percent') {
        inputPercent();
      } else if (action === 'plus-minus') {
        plusMinus();
      }
    }
  });
});
