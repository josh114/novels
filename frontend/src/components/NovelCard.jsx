import { Flex, Image, Text } from "@chakra-ui/react";

const NovelCard = ({ data }) => {
  return (
    <Flex maxW={"120px"} flexDir={"column"}>
      <Image src={data.image} maxW={"120px"} />
      <Text fontSize={"14px"}>{data.title}</Text>
    </Flex>
  );
};

export default NovelCard;
