import { getInitialsFromName } from "./getInitialsFromName";

it("given a one word name, return just one uppercased initial", () => {
  expect(getInitialsFromName("Cher")).toStrictEqual("C");
  expect(getInitialsFromName("Prince")).toStrictEqual("P");
});

it("given a two word name, return uppercased initials", () => {
  expect(getInitialsFromName("Ed Halliwell")).toStrictEqual("EH");
  expect(getInitialsFromName("Will Smith")).toStrictEqual("WS");
});

it("given a three word name, return the first and last uppercased initials", () => {
  expect(getInitialsFromName("Sarah Jessica Parker")).toStrictEqual("SP");
  expect(getInitialsFromName("Sarah Michelle Gellar")).toStrictEqual("SG");
});

it("given a four word name, return the first and last uppercased initials", () => {
  expect(getInitialsFromName("Edwin Van Der Sar")).toStrictEqual("ES");
  expect(getInitialsFromName("Rafael Van Der Vaart")).toStrictEqual("RV");
});
