export const getInitialsFromName = (name: string): string => {
  const nameArray = name.split(" ");
  if (nameArray.length === 1) {
    return nameArray[0][0];
  } else if (nameArray.length === 2) {
    return nameArray[0][0] + nameArray[1][0];
  } else if (nameArray.length === 3) {
    return nameArray[0][0] + nameArray[2][0];
  } else {
    return nameArray[0][0] + nameArray[nameArray.length - 1][0];
  }
};
