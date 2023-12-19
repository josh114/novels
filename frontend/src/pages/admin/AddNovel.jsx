// import React from 'react'

import { Flex, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const AddNovel = () => {
  const navigate = useNavigate();
  return (
    <Flex w={"100%"} p={"30px"}>
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
      <Flex></Flex>
    </Flex>
  );
};

export default AddNovel;
