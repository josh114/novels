// import React from 'react'

import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import FetchChapter from "../../components/FetchChapter";
import { useParams } from "react-router-dom";

const EditChapter = () => {
  const { id } = useParams();
  const chap = FetchChapter(id);

  return (
    <Flex w={"100%"} justify={"center"}>
      <Flex w={{ base: "100%", md: "80%" }} flexDir={"column"} mt={"20px"}>
        <VStack w={"100%"} align={"start"} gap={5}>
          <Heading size={"sm"} color={"gray.600"}>
            {chap.novel.name ? chap.novel.name : "Novel Name"}
          </Heading>
          <Text fontSize={"13px"} textAlign={"justify"}>
            {chap.novel ? chap.novel.description : "Novel Description"}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default EditChapter;
