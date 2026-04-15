#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation
 * - square root
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

function modulo(firstValue, secondValue) {
  const [dividend, divisor] = validateNumbers([firstValue, secondValue]);

  if (divisor === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return dividend % divisor;
}

function power(baseValue, exponentValue) {
  const [base, exponent] = validateNumbers([baseValue, exponentValue]);

  return base ** exponent;
}

function squareRoot(value) {
  const [number] = validateNumbers([value]);

  if (number < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(number);
}

function runCli(argumentsList) {
  const [rawOperation, ...rawOperands] = argumentsList;
  let operation = rawOperation;
  let operands = rawOperands;

  if (rawOperation && rawOperation.startsWith("√") && rawOperation.length > 1) {
    operation = "√";
    operands = [rawOperation.slice(1)];
  }

  if (!operation) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <number> <number> [additional numbers for add/multiply]"
    );
  }

  switch (operation) {
    case "add":
      if (operands.length < 2) {
        throw new Error("Addition requires at least two numbers.");
      }
      return add(...operands);
    case "subtract":
      if (operands.length !== 2) {
        throw new Error("Subtraction requires exactly two numbers.");
      }
      return subtract(operands[0], operands[1]);
    case "multiply":
      if (operands.length < 2) {
        throw new Error("Multiplication requires at least two numbers.");
      }
      return multiply(...operands);
    case "divide":
      if (operands.length !== 2) {
        throw new Error("Division requires exactly two numbers.");
      }
      return divide(operands[0], operands[1]);
    case "modulo":
    case "%":
      if (operands.length !== 2) {
        throw new Error("Modulo requires exactly two numbers.");
      }
      return modulo(operands[0], operands[1]);
    case "power":
    case "^":
      if (operands.length !== 2) {
        throw new Error("Power requires exactly two numbers.");
      }
      return power(operands[0], operands[1]);
    case "sqrt":
    case "√":
      if (operands.length !== 1) {
        throw new Error("Square root requires exactly one number.");
      }
      return squareRoot(operands[0]);
    default:
      throw new Error(
        `Unsupported operation: ${operation}. Use add, subtract, multiply, divide, modulo, power, or sqrt.`
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
  modulo,
  power,
  squareRoot,
  runCli,
};
