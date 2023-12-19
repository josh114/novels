// import React from "react";

import {
  Flex,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { MdSpaceDashboard, MdOutlineBook } from "react-icons/md";
import { FaBook } from "react-icons/fa6";

import { LuSettings } from "react-icons/lu";

const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let activeStyle = {
    fontWeight: "bold",
    color: "teal",
  };
  let inActive = {
    display: "flex",
  };

  return (
    <Flex
      maxW={"250px"}
      minH={"100vh"}
      w={"100%"}
      position={"relative"}
      borderRight={"1px solid"}
      color={"#eaeaea"}
    >
      <Flex position={"fixed"} w={"100%"} maxW={"250px"} flexDir={"column"}>
        <Flex align={"center"} w={"100%"} justify={"center"} m={"40px 0"}>
          <Heading size={"md"} color={"blackAlpha.900"} ml={"20px"}>
            Novel Kona
          </Heading>
        </Flex>
        <Flex w={"100%"} align={"center"} justify={"center"} fontSize={"14px"}>
          <List spacing={5}>
            <ListItem color={"blackAlpha.700"}>
              <NavLink to={"/admin/dash"}>
                <HStack
                  style={pathname === "/admin/dash" ? activeStyle : inActive}
                >
                  <ListIcon as={MdSpaceDashboard} />
                  <Text> Dashboard</Text>
                </HStack>
              </NavLink>
            </ListItem>

            <ListItem color={"blackAlpha.700"}>
              <NavLink to={"/admin/novel"}>
                <HStack
                  style={
                    pathname === "/admin/novel" ||
                    pathname === "/admin/novel/add" ||
                    pathname === "/admin/novel/update"
                      ? activeStyle
                      : inActive
                  }
                >
                  <ListIcon as={FaBook} />
                  <Text>Novels</Text>
                </HStack>
              </NavLink>
            </ListItem>

            <ListItem color={"blackAlpha.700"}>
              <NavLink to={"/admin/chapter"}>
                <HStack
                  style={
                    pathname === "/admin/chapter" ||
                    pathname === "/admin/chapter/add" ||
                    pathname === "/admin/chapter/update"
                      ? activeStyle
                      : inActive
                  }
                >
                  <ListIcon as={MdOutlineBook} />
                  <Text>Chapters</Text>
                </HStack>
              </NavLink>
            </ListItem>

            <ListItem color={"blackAlpha.700"}>
              <NavLink>
                <HStack
                  style={
                    pathname === "/admin/settings" ? activeStyle : inActive
                  }
                >
                  <ListIcon as={LuSettings} />
                  <Text>Settings</Text>
                </HStack>
              </NavLink>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminSidebar;
