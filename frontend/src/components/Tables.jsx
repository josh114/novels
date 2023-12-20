import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  //   Tfoot,
  Tr,
  Th,
  Td,
  //   TableCaption,
  TableContainer,
  Checkbox,
  HStack,
  Image,
  VStack,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
// import fastXtum from "../assets/fastXThumbnail.png";
import { NavLink } from "react-router-dom";
import HandleText from "./HandleText";
import HandleDate from "./HandleDate";
import { useDeleteUploadMutation } from "../features/UploadSlice";
import { dl_url } from "../config/url";

const Tables = ({ data }) => {
  const [deleteUpload] = useDeleteUploadMutation();
  const [msg, setMsg] = useState("");
  const [display, setDisplay] = useState(false);
  let tableData;
  let content;

  if (!data || data.length === 0) {
    tableData = "loading data";
    content = (
      <Tr>
        <Td></Td>
        <Td>
          <Text fontSize={"13px"} color={"gray"}>
            No Uploads found
          </Text>
        </Td>
        <Td></Td>
      </Tr>
    );
  } else {
    tableData = data;
    content = tableData.map((upload) => (
      <Tr
        onMouseOver={() => setDisplay(true)}
        onMouseOut={() => setDisplay(false)}
        key={upload.id}
      >
        <Td p={"12px"} borderColor={"gray.200"}>
          <Flex w={"100%"} justify={"start"} align={"start"}>
            <Checkbox />
          </Flex>
        </Td>
        <Td p={"12px"} borderColor={"gray.200"}>
          <HStack align={"start"} flexDir={{ base: "column", sm: "row" }}>
            <Image
              src={`${dl_url}/download/${upload.thumbnail}`}
              maxW={"60px"}
            />
            <VStack align={"start"} ml={"10px"} justify={"start"}>
              <Heading size={"xs"}>{upload.title}</Heading>
              <HandleText text={upload.filename} fontSize={"12px"} />
              <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
                <NavLink>
                  <Text fontSize={"12px"} color={"teal.400"}>
                    Edit
                  </Text>
                </NavLink>
                <Text
                  fontSize={"12px"}
                  color={"red.400"}
                  _hover={{ cursor: "pointer" }}
                  onClick={async () => {
                    try {
                      await deleteUpload(upload.id);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete
                </Text>

                <Text
                  fontSize={"12px"}
                  color={"teal.400"}
                  _hover={{ cursor: "pointer" }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${dl_url}/${upload.download}`
                      );
                      setMsg("copied");
                    } catch (error) {
                      console.error(error?.message);
                      setMsg("failed");
                    }
                  }}
                >
                  Copy Link
                </Text>
                <NavLink to={`${dl_url}/${upload.filename}`}>
                  <Text fontSize={"12px"} color={"teal.400"}>
                    Download file
                  </Text>
                </NavLink>
              </Flex>
            </VStack>
          </HStack>
        </Td>
        <Td p={"12px"} borderColor={"gray.200"}>
          <HandleDate date={upload.createdAt} fontSize={"14px"} />
        </Td>
      </Tr>
    ));
  }
  // console.log(data);
  // console.log(tableData);
  return (
    <Flex maxW={"100%"} w={"100%"} justify={"center"}>
      <TableContainer w={"100%"} overflowX={"hidden"}>
        <Table w={"100%"} colorScheme="gray" bg={"gray.50"}>
          <Thead w={"100%"} bg={"gray.50"}>
            <Tr w={"100%"}>
              <Th w={"20px"} p={"12px"}>
                <Checkbox />
              </Th>
              <Th w={"70%"} p={"12px"} color={"gray"}>
                File
              </Th>
              <Th p={"12px"} color={"gray"}>
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>{content}</Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Tables;
