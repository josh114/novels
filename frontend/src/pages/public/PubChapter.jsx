// import React from 'react';

import { Button, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleChapterQuery } from "../../features/chapterSlice";
import HandleDateFormat from "../../components/HandleDateFormat";

const PubChapter = () => {
  const { chapterId } = useParams();
  let chap;
  const { data, isLoading, isSuccess, isError, error } =
    useGetSingleChapterQuery(chapterId);
  if (isLoading) chap = "loading ..";
  if (isError) chap = error;
  if (isSuccess) {
    chap = Object.values(data.entities)[0];
    console.log(chap);
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
                {chap.novel ? chap.novel.name.toLowerCase() : "novel"}
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
                  : "chapter"}
              </Text>
            </NavLink>
          </HStack>
          <Button size={"xs"} colorScheme="teal">
            Bottom
          </Button>
        </HStack>
        <Flex w={"100%"} justify={"center"}>
          <Flex
            w={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
            flexDir={"column"}
            align={"center"}
            m={"20px 0"}
            gap={"30px"}
          >
            <Heading>{chap.novel ? chap.novel.name : "novel"}</Heading>
            <Flex w={"100%"} justify={"end"}>
              <VStack>
                <Text fontSize={"12px"}>
                  Posted on:{" "}
                  {chap.createdAt ? (
                    <HandleDateFormat date={chap.createdAt} />
                  ) : (
                    ""
                  )}
                </Text>
                <Text fontSize={"12px"}>
                  Updated on:{" "}
                  {chap.updatedAt ? (
                    <HandleDateFormat date={chap.updatedAt} />
                  ) : (
                    ""
                  )}
                </Text>
              </VStack>
            </Flex>
            <Heading size={"xs"} color={"gray.600"}>
              Chapter {chap.chapter ? chap.chapter : 0}
            </Heading>
            <Flex>
              {chap.content ? (
                <div
                  className="main_content"
                  dangerouslySetInnerHTML={{ __html: chap.content }}
                />
              ) : (
                "no content"
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PubChapter;
