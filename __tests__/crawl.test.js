const { normalizeUrl } = require("../crawl.js");
const { test, expect } = require("@jest/globals");

/**
 * 'https://boot.dev -> boot.dev
 * http://boot.dev -> boot.dev
 * https://Boot.dev -> boot.dev
 */
test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL trim trailing slash(/)", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

/**The URL constructor in our normalizeUrl function helps to lowercase, stripping making our test to work as expected*/
test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
