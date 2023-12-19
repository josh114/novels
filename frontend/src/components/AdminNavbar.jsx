// import React from "react";

import { Flex, HStack, Text } from "@chakra-ui/react";

const AdminNavbar = () => {
  return (
    <Flex w={"100%"} h={"50px"} boxShadow={"0 2px 10px rgba(0,0,0, 0.1)"}>
      <HStack w={"100%"}>
        <Text ml={"40px"}>Welcome, Josh</Text>
      </HStack>
    </Flex>
  );
};

export default AdminNavbar;
