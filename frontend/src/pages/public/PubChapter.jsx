// import React from 'react';

import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
    chap = data;
  }
  return (
    <Flex w={"100%"}>
      <Flex>{chapterId}</Flex>
    </Flex>
  );
};

export default PubChapter;
