import { formatContentType } from "./formatContentType";

it("formatContentType returns a string with correct formatting for each of the content types in the database", () => {
  expect(formatContentType("podcast")).toStrictEqual("Podcast");
  expect(formatContentType("magazine")).toStrictEqual("Magazine");
  expect(formatContentType("book")).toStrictEqual("Book");
  expect(formatContentType("documentary")).toStrictEqual("Documentary");
  expect(formatContentType("events")).toStrictEqual("Events");
  expect(formatContentType("video")).toStrictEqual("Video");
  expect(formatContentType("article")).toStrictEqual("Article");
  expect(formatContentType("blog")).toStrictEqual("Blog");
  expect(formatContentType("course")).toStrictEqual("Course");
  expect(formatContentType("eBook")).toStrictEqual("EBook");
  expect(formatContentType("exercise")).toStrictEqual("Exercise");
  expect(formatContentType("software tool")).toStrictEqual("Software tool");
  expect(formatContentType("documentation")).toStrictEqual("Documentation");
  expect(formatContentType("cheatsheet")).toStrictEqual("Cheatsheet");
  expect(formatContentType("diagram")).toStrictEqual("Diagram");
  expect(formatContentType("reference")).toStrictEqual("Reference");
  expect(formatContentType("youtube channel")).toStrictEqual("Youtube channel");
  expect(formatContentType("organisation")).toStrictEqual("Organisation");
  expect(formatContentType("other")).toStrictEqual("Other");
});
