import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useGetChaptersQuery } from "../features/chapterSlice";

const AdminChapters = ({ novelId }) => {
  let display;
  const { data, isLoading, isSuccess, isError, error } =
    useGetChaptersQuery(novelId);
  if (isLoading) display = "Loading...";
  if (isError) display = error;
  if (isSuccess) {
    const chapters = Object.values(data.entities);
    display = chapters.map((chap) => {
      return (
        <NavLink to={`/admin/chapter/${chap.slug}`} key={chap.id}>
          <Text fontSize={"13px"} _hover={{ color: "teal" }}>
            Chapter {chap.chapter}
          </Text>
        </NavLink>
      );
    });
  }
  return (
    <Flex maxW={"100%"} flexWrap={"wrap"} gap={8}>
      {display}
    </Flex>
  );
};

export default AdminChapters;
