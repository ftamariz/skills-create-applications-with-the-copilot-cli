#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function validateNumbers(values) {
  if (values.length === 0) {
    throw new Error("At least one number is required.");
  }

  const parsedValues = values.map((value) => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`Invalid number: ${value}`);
    }

    return parsedValue;
  });

  return parsedValues;
}

function add(...values) {
  const numbers = validateNumbers(values);

  return numbers.reduce((total, value) => total + value, 0);
}

function subtract(firstValue, secondValue) {
  const [minuend, subtrahend] = validateNumbers([firstValue, secondValue]);

  return minuend - subtrahend;
}

function multiply(...values) {
  const numbers = validateNumbers(values);

  return numbers.reduce((total, value) => total * value, 1);
}

function divide(firstValue, secondValue) {
  const [dividend, divisor] = validateNumbers([firstValue, secondValue]);

  if (divisor === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return dividend / divisor;
}

function runCli(argumentsList) {
  const [operation, ...operands] = argumentsList;

  if (!operation || operands.length < 2) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide> <number> <number> [additional numbers for add/multiply]"
    );
  }

  switch (operation) {
    case "add":
      return add(...operands);
    case "subtract":
      if (operands.length !== 2) {
        throw new Error("Subtraction requires exactly two numbers.");
      }
      return subtract(operands[0], operands[1]);
    case "multiply":
      return multiply(...operands);
    case "divide":
      if (operands.length !== 2) {
        throw new Error("Division requires exactly two numbers.");
      }
      return divide(operands[0], operands[1]);
    default:
      throw new Error(
        `Unsupported operation: ${operation}. Use add, subtract, multiply, or divide.`
      );
  }
}

if (require.main === module) {
  try {
    const result = runCli(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  runCli,
};
