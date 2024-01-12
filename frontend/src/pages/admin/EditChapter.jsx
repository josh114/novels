// import React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import FetchChapter from "../../components/FetchChapter";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditChapter = () => {
  const { id } = useParams();
  const chap = FetchChapter(id);
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        content,
      };
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex w={"100%"} justify={"center"}>
      <Flex
        w={{ base: "100%", md: "80%" }}
        flexDir={"column"}
        mt={"20px"}
        gap={10}
      >
        <VStack w={"100%"} align={"start"} gap={5}>
          <Heading size={"sm"} color={"gray.600"}>
            {chap.novel ? chap.novel.name : "Novel Name"}
          </Heading>
          <Text fontSize={"13px"} textAlign={"justify"}>
            {chap.novel ? chap.novel.description : "Novel Description"}
          </Text>
        </VStack>
        <VStack>
          <Heading size={"sm"} color={"gray.600"}>
            Edit Chapter {chap.chapter ? chap.chapter : 0}
          </Heading>
          <FormControl w={"100%"}>
            <FormLabel>Content:</FormLabel>
            <CKEditor
              editor={ClassicEditor}
              data={chap.content ? chap.content : ""}
              onBlur={(event, editor) => {
                const data = editor.getData();
                setContent(data);
                // console.log('data.', data);
              }}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Update
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default EditChapter;
