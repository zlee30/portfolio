let current = '0';
const display = document.getElementById('display');
const history = document.getElementById('history');

function render() {
  display.textContent = current;
}

function renderHistory(text) {
  history.textContent = text || '\u00A0';
}

function appendNum(n) {
  if (current === '0' && n !== '.') {
    current = n;
  } else if (n === '.' && current.split(/[+\-*/()]/).pop().includes('.')) {
    return;
  } else {
    current += n;
  }
  render();
}

function appendOp(op) {
  const lastChar = current.slice(-1);
  if (lastChar === '(') return;
  if ('+-*/'.includes(lastChar)) {
    current = current.slice(0, -1) + op;
  } else {
    current += op;
  }
  render();
}

function appendBracket() {
  const opens = (current.match(/\(/g) || []).length;
  const closes = (current.match(/\)/g) || []).length;
  const lastChar = current.slice(-1);
  const lastIsDigit = lastChar >= '0' && lastChar <= '9';
  const shouldClose = opens > closes && (lastChar === ')' || lastIsDigit);

  if (shouldClose) {
    current += ')';
  } else if (current === '0') {
    current = '(';
  } else if (lastIsDigit || lastChar === ')') {
    current += '*(';
  } else {
    current += '(';
  }
  render();
}

function clearAll() {
  current = '0';
  render();
  renderHistory('');
}

function backspace() {
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
  render();
}

function percent() {
  const match = current.match(/(\d+\.?\d*)$/);
  if (!match) return;

  const lastNumber = match[0];
  const asPercent = parseFloat(lastNumber) / 100;

  // If the character before our number is already an operator,
  // don't add another * (avoids things like "5+*20")
  const charBefore = current.slice(0, -lastNumber.length).slice(-1);
  const isAfterOperator = '+-*/('.includes(charBefore);

  current = current.slice(0, -lastNumber.length) + asPercent + (isAfterOperator ? '' : '*');
  render();
}

function prettify(expr) {
  return expr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/(\d)-/g, '$1 − ');
}

function calculate() {
  try {
    const opens = (current.match(/\(/g) || []).length;
    const closes = (current.match(/\)/g) || []).length;
    const expression = current + ')'.repeat(Math.max(0, opens - closes));
    const result = Function('"use strict";return (' + expression + ')')();
    const rounded = Math.round(result * 1e10) / 1e10;

    renderHistory(prettify(expression) + ' =');
    current = String(rounded);
    render();
  } catch (e) {
    current = 'Error';
    render();
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    appendNum(key);
  } else if (key === '.') {
    appendNum('.');
  } else if ('+-*/'.includes(key)) {
    appendOp(key);
  } else if (key === '(' || key === ')') {
    if (current === '0' && key === '(') current = '(';
    else current += key;
    render();
  } else if (key === '%') {
    percent();
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearAll();
  }
});