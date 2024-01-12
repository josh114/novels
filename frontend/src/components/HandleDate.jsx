import { Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

const HandleDate = ({ date, fontSize }) => {
  let content;
  if (date) {
    const formatDate = formatDistanceToNow(new Date(date), { addSuffix: true });
    // console.log(formatDate);
    content = <Text fontSize={fontSize && fontSize}>{formatDate}</Text>;
  } else {
    content = <Text fontSize={fontSize && fontSize}>Loading...</Text>;
  }
  return content;
};

export default HandleDate;
