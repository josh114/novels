import {
  Card,
  CardBody,
  Flex,
  HStack,
  // Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useGetNovelsQuery } from "../features/novelSlice";
import { dl_url } from "../config/url";
import HandleText from "./HandleText";
import { useNavigate } from "react-router-dom";

const Recommended = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetNovelsQuery();
  const navigate = useNavigate();
  let novel;
  if (isLoading) {
    novel = "Loading...";
  } else if (isSuccess) {
    let loadedNovels = Object.values(data.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    novel = loadedNovels.map((novel) => {
      return (
        <Card
          direction={"row"}
          key={novel.id}
          w={"100%"}
          p={0}
          //   onClick={() => {
          //     setSelectedNovel(novel);
          //   }}
          _hover={{
            bg: "gray.50",
          }}
          onClick={() => navigate(`/${novel.slug ? novel.slug : novel.id}`)}
        >
          <CardBody p={3}>
            <HStack align={"center"}>
              <Image
                src={`${dl_url}/download/${
                  novel.thumbnail
                    ? novel.thumbnail
                    : novel.image
                    ? novel.image.thumbnail
                    : ""
                }`}
                maxH={"30px"}
              />
              <VStack align={"flex-start"}>
                <HandleText
                  bold={"semi-bold"}
                  text={novel.name}
                  fontSize={"12px"}
                  base={20}
                />
                {/* <HandleText
                  text={novel.description}
                  fontSize={'12px'}
                  base={20}
                  sm={20}
                  md={20}
                  lg={20}
                  xl={20}
                /> */}
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      );
    });
  } else if (isError) {
    novel = `Something went wrong! ${error?.message}`;
  }
  return (
    <Flex w={"100%"} p={"20px"} flexDirection={"column"} gap={5}>
      {novel}
    </Flex>
  );
};

export default Recommended;
