const test = require("node:test");
const assert = require("node:assert/strict");

const {
  add,
  subtract,
  multiply,
  divide,
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

test("runs CLI operations", () => {
  assert.equal(runCli(["add", "5", "3"]), 8);
  assert.equal(runCli(["subtract", "9", "2"]), 7);
  assert.equal(runCli(["multiply", "2", "5"]), 10);
  assert.equal(runCli(["divide", "8", "4"]), 2);
});

test("rejects unsupported CLI operations", () => {
  assert.throws(() => runCli(["mod", "8", "4"]), /Unsupported operation/);
});
