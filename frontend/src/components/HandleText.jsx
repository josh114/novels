import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HandleText = ({ text, fontSize, base, sm, md, lg, xl, bold }) => {
  const Width = window.innerWidth;
  const [size, setSize] = useState(() =>
    Width <= 480
      ? base || 30
      : Width > 480 && Width <= 768
      ? sm || 40
      : Width > 768 && Width <= 992
      ? md || 50
      : Width > 992 && Width <= 1280
      ? lg || 60
      : xl || 90
  );
  const [ellipsis, setEllipsis] = useState(true);
  //   console.log(size);
  const handleWidth = (width) => {
    if (width <= 480) {
      setSize(base || 20);
    } else if (width > 480 && width <= 768) {
      setSize(sm || 40);
    } else if (width > 768 && width <= 992) {
      setSize(md || 50);
    } else if (width > 992 && width <= 1280) {
      setSize(lg || 60);
    } else if (width > 1280) {
      setSize(xl || 90);
      setEllipsis(false);
    }
    if (text.length < size) {
      setEllipsis(false);
    }
    return size;
  };
  const updateWidth = () => {
    const screenWidth = window.innerWidth;
    handleWidth(screenWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  return (
    <Text fontWeight={bold} fontSize={fontSize}>
      {text.substring(0, size)}
    </Text>
  );
};

export default HandleText;
