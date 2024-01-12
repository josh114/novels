import format from "date-fns/format";

const HandleDateFormat = ({ date }) => {
  let content;
  if (date) {
    content = format(new Date(date), "MMMM do, yyyy p");
  } else {
    content = "";
  }
  return content;
};

export default HandleDateFormat;
