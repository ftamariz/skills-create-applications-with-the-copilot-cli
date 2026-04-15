const test = require("node:test");
const assert = require("node:assert/strict");

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  runCli,
} = require("../calculator");

test("adds numbers", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(1, 2, 3, 4), 10);
});

test("subtracts two numbers", () => {
  assert.equal(subtract(10, 4), 6);
});

test("multiplies numbers", () => {
  assert.equal(multiply(2, 3), 6);
  assert.equal(multiply(2, 3, 4), 24);
});

test("divides two numbers", () => {
  assert.equal(divide(12, 3), 4);
});

test("prevents division by zero", () => {
  assert.throws(() => divide(9, 0), /Division by zero/);
});

test("calculates modulo", () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(10, 5), 0);
});

test("prevents modulo by zero", () => {
  assert.throws(() => modulo(9, 0), /Modulo by zero/);
});

test("calculates power", () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(9, 0.5), 3);
});

test("calculates square root", () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
});

test("rejects square root of negative numbers", () => {
  assert.throws(() => squareRoot(-1), /Square root of a negative number/);
});

test("runs CLI operations", () => {
  assert.equal(runCli(["add", "5", "3"]), 8);
  assert.equal(runCli(["subtract", "9", "2"]), 7);
  assert.equal(runCli(["multiply", "2", "5"]), 10);
  assert.equal(runCli(["divide", "8", "4"]), 2);
  assert.equal(runCli(["%", "5", "2"]), 1);
  assert.equal(runCli(["^", "2", "3"]), 8);
  assert.equal(runCli(["sqrt", "16"]), 4);
  assert.equal(runCli(["√16"]), 4);
});

test("validates CLI arguments for new operations", () => {
  assert.throws(
    () => runCli(["modulo", "10"]),
    /Modulo requires exactly two numbers/
  );
  assert.throws(
    () => runCli(["power", "2"]),
    /Power requires exactly two numbers/
  );
  assert.throws(
    () => runCli(["sqrt", "-4"]),
    /Square root of a negative number/
  );
});

test("rejects unsupported CLI operations", () => {
  assert.throws(() => runCli(["unknown", "8", "4"]), /Unsupported operation/);
});
