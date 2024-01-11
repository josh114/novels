// import React from 'react';
import { useGetSingleNovelQuery } from "../../features/getNovelSlice";
import { NavLink, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  HStack,
  Heading,
  // Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { MdArrowDropDown } from 'react-icons/md';
import { dl_url } from "../../config/url";
import Chapters from "../../components/Chapters";

const Novel = () => {
  let novel;
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetSingleNovelQuery(id);
  if (isLoading) {
    novel = "loading...";
  }
  if (isError) {
    novel = error;
  }
  if (isSuccess) {
    novel = data;
    console.log(data);
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
            <NavLink to={`/${id}`}>
              <Text fontSize={"12px"} _hover={{ color: "teal.500" }}>
                {novel.name ? novel.name.toLowerCase() : ""}
              </Text>
            </NavLink>
          </HStack>
          <Button size={"xs"} colorScheme="teal">
            Bottom
            {/* <Icon as={MdArrowDropDown} fontSize={'20px'} /> */}
          </Button>
        </HStack>
        <VStack w={"100%"} align={"center"}>
          <Heading m={"20px 0"}>{novel.name ?? "novel"}</Heading>
          <Image
            maxH={"250px"}
            src={`${dl_url}/download/files/${
              novel.image ? novel.image.filename : ""
            }`}
          />
          <Flex
            w={{ base: "80%", sm: "70%", md: "60%", lg: "50%" }}
            justify={"center"}
            m={"15px 0"}
          >
            <Text fontSize={"13px"} textAlign={"center"}>
              {novel.description ?? "description"}
            </Text>
          </Flex>
          <Heading size={"sm"} color={"gray.600"}>
            Chapters
          </Heading>
          <VStack w={"60%"}>
            {novel.id ? <Chapters novelId={novel.id} /> : "no chapters found"}
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Novel;
