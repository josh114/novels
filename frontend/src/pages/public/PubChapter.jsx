// import React from 'react';

import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleChapterQuery } from "../../features/chapterSlice";

const PubChapter = () => {
  const { chapterId } = useParams();
  let chap;
  const { data, isLoading, isSuccess, isError, error } =
    useGetSingleChapterQuery(chapterId);
  if (isLoading) chap = "loading ..";
  if (isError) chap = error;
  if (isSuccess) {
    console.log(data);
    chap = Object.values(data.entities);
  }
  return (
    <Flex w={"100%"}>
      <Flex w={"100%"} flexDir={"column"}>
        <HStack w={"100%"} mt={"20px"} justify={"space-between"} p={"0 50px"}>
          <HStack>
            <NavLink to={"/"}>
              <Text fontSize={"12px"} _hover={{ color: "teal.500" }}>
                Home
              </Text>
            </NavLink>
            <Text p={"0 10px"} fontSize={"14px"} color={"gray.500"}>
              /
            </Text>
            <NavLink to={`/${chap.novel ? chap.novel.slug : "#"}`}>
              <Text fontSize={"12px"} _hover={{ color: "teal.500" }}>
                {chap.novel ? chap.novel.name.toLowerCase() : ""}
              </Text>
            </NavLink>
            <Text p={"0 10px"} fontSize={"14px"} color={"gray.500"}>
              /
            </Text>
            <NavLink
              to={`/${chap.novel ? chap.novel.slug : "#"}/${
                chap.slug ? chap.slug : "#"
              }`}
            >
              <Text fontSize={"12px"} _hover={{ color: "teal.500" }}>
                {chap.slug
                  ? `${chap.novel.name.toLowerCase()} chapter ${chap.chapter}`
                  : ""}
              </Text>
            </NavLink>
          </HStack>
          <Button size={"xs"} colorScheme="teal">
            Bottom
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default PubChapter;
