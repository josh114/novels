import {
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  // MdContentCopy,
} from "react-icons/md";
import { useGetUploadsQuery } from "../../features/UploadSlice";
import { useState } from "react";
import Tables from "../../components/Tables";

const Uploads = () => {
  const [page, setPage] = useState(1);

  let buttons;
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetUploadsQuery();
  let perPage = 5;
  let content;
  let totalPages;
  let items;
  let paginatedData;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = Object.values(data.entities).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    paginatedData = content.slice((page - 1) * perPage, page * perPage);
    console.log(paginatedData);
    totalPages = content.length / perPage;
    if (totalPages % 1 != 0) {
      if (Math.round(totalPages) - totalPages >= 0) {
        totalPages = Math.round(totalPages);
      } else if (totalPages - Math.round(totalPages) < 0.5) {
        totalPages = Math.round(totalPages) + 1;
      }
    }
    items = content.length;
  }

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  buttons = (
    <HStack>
      <Text fontSize={"12px"}>{items} items</Text>
      <Button
        colorScheme="teal"
        size={"xs"}
        onClick={() => handlePagination(1)}
        isDisabled={page === 1}
      >
        <Icon as={MdKeyboardDoubleArrowLeft} />
      </Button>
      <Button
        colorScheme="teal"
        size={"xs"}
        onClick={() => handlePagination(page - 1)}
        isDisabled={page === 1}
      >
        <Icon as={MdKeyboardArrowLeft} />
      </Button>
      <Input
        type="text"
        value={page}
        w={"30px"}
        size={"xs"}
        fontSize={"12px"}
        onChange={(e) => setPage(Number(e.target.value))}
        disabled={totalPages === 1}
      />
      <Text fontSize={"12px"}>of {totalPages}</Text>
      <Button
        size={"xs"}
        colorScheme="teal"
        isDisabled={page === totalPages || totalPages === 0}
        onClick={() => handlePagination(page + 1)}
      >
        <Icon as={MdKeyboardArrowRight} />
      </Button>
      <Button
        size={"xs"}
        colorScheme="teal"
        isDisabled={page === totalPages || totalPages === 0}
        onClick={() => handlePagination(totalPages)}
      >
        <Icon as={MdKeyboardDoubleArrowRight} />
      </Button>
    </HStack>
  );
  return (
    <Flex w={"100%"} p={"30px"} flexDir={"column"}>
      <VStack w={"100%"}>
        <Flex justify={"start"} w={"100%"}>
          <Button
            colorScheme={"teal"}
            size={"xs"}
            onClick={() => navigate("/admin/upload/add")}
          >
            Add new
          </Button>
        </Flex>

        <Flex
          w={"100%"}
          m={"20px 0"}
          p={"15px 10px"}
          bg={"gray.50"}
          justify={"space-between"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <HStack>
            <FormControl>
              <Select
                placeholder="All Uploads"
                // onChange={(e) => setMedia(e.target.value)}
                focusBorderColor="teal.400"
                fontSize={"12px"}
                size={"xs"}
              >
                <option value="Video">Hollywood</option>
                <option value="Video">Bollywood</option>
                <option value="Video">Nollywood</option>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                placeholder="All dates"
                // onChange={(e) => setDate(e.target.value)}
                focusBorderColor="teal.400"
                fontSize={"12px"}
                size={"xs"}
              >
                <option value="Video">Recent</option>
                <option value="Video">Last week</option>
                <option value="Video">Last month</option>
                <option value="Video">Last 3 months</option>
                <option value="Video">2023</option>
              </Select>
            </FormControl>
            <Button colorScheme="teal" size={"xs"} p={"0 15px"}>
              Filter
            </Button>
          </HStack>
          <Input
            type="text"
            placeholder="search"
            w={{ base: "100%", lg: "300px", xl: "400px" }}
            mt={{ base: "20px", lg: "0" }}
            focusBorderColor="teal.400"
            // onChange={handleChange}
            size={"sm"}
            borderRadius={"5px"}
          />
        </Flex>
        <Flex
          w={"100%"}
          justify={"space-between"}
          m={"20px 0"}
          flexDir={{ base: "column-reverse", md: "row" }}
        >
          <HStack mt={{ base: "20px", md: "0" }}>
            <FormControl>
              <Select
                fontSize={"13px"}
                // onChange={(e) => setBulk(e.target.value)}
                placeholder="Bulk Actions"
                size={"xs"}
              >
                <option value="delete"> Delete permanently</option>
              </Select>
            </FormControl>
            <Button size={"xs"} colorScheme="teal" p={"0 15px"}>
              Apply
            </Button>
          </HStack>
          {buttons}
        </Flex>
      </VStack>
      <Flex w={"100%"}>
        <Tables data={paginatedData} />
      </Flex>
    </Flex>
  );
};

export default Uploads;
