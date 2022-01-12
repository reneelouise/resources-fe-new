import moment from "moment";
export default function timestampConverter(timestamp: string): string {
  const array = timestamp.split(/-|:|\.|T/g);
  const numArr = array.map((num) => parseInt(num));
  const result = moment([
    numArr[0],
    numArr[1] - 1,
    numArr[2],
    numArr[3],
    numArr[4],
  ]).fromNow();
  return result;
}
