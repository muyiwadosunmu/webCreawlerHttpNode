const { normalizeUrl, getUrlsFromHTML } = require("../crawl.js");
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

/**The URL constructor in our normalizeUrl function helps to lowercase, stripping making our test to work as expected */
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

test("getUrlsFromHTML absolute", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`;
  const inputBaseURL = "https://blog.boot.dev/path/";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
      <body>
          <a href="/path/">
              Boot.dev Blog
          </a>
      </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML both relative and absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/1">
                Boot.dev Blog path One
            </a>
            <a href="/path/2">
                Boot.dev Blog path Two
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path/1",
    "https://blog.boot.dev/path/2",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML badUrl", () => {
  const inputHTMLBody = `
  <html>
      <body>
          <a href="invalid">
              Invali Url
          </a>
      </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
