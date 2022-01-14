export const formatContentType = (word: string): string => {
  return word !== null ? word[0].toUpperCase() + word.slice(1) : "Not found";
};
