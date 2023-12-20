// import React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";

const AddNovel = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Flex w={"100%"} p={"30px"} flexDir={"column"}>
      <Flex w={"100%"} mb={"20px"}>
        <Flex
          w={"30px"}
          h={"30px"}
          _hover={{ bg: "gray.100", color: "teal" }}
          borderRadius={"30px"}
          align={"center"}
          justify={"center"}
        >
          <Icon as={BsArrowLeft} onClick={() => navigate("/admin/novel")} />
        </Flex>
      </Flex>
      <Flex w={"100%"} justify={"center"}>
        <form className="form">
          <HStack w={"100%"}>
            <Flex></Flex>
            <VStack w={{ base: "100%", md: "60%" }}>
              <FormControl w={"100%"}>
                <FormLabel>Novel Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  focusBorderColor="teal.400"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl w={"100%"}>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  // value={plot}
                  focusBorderColor="teal.400"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" mt={"20px"} p={"0 20px"}>
                Add Novel
              </Button>
            </VStack>
          </HStack>
        </form>
      </Flex>
    </Flex>
  );
};

export default AddNovel;
