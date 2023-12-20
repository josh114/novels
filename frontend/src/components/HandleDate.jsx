import { Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";

const HandleDate = ({ date, fontSize }) => {
  let content;
  if (date) {
    // console.log(date);
    const str = parseISO(date);
    // console.log(str);
    const formatDate = formatDistanceToNow(new Date(date), { addSuffix: true });
    // console.log(formatDate);
    content = <Text fontSize={fontSize && fontSize}>{formatDate}</Text>;
  } else {
    content = <Text fontSize={fontSize && fontSize}>Loading...</Text>;
  }
  return content;
};

export default HandleDate;
