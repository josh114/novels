import {
  Card,
  CardBody,
  CardFooter,
  // Flex,
  HStack,
  // Heading,
  Image,
  Text,
  // VStack,
} from "@chakra-ui/react";
// import { useGetNovelsQuery } from '../features/getNovelSlice';
import { dl_url } from "../config/url";
// import HandleText from './HandleText';
import FetchNovel from "./FetchNovel";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  //   const { data, isLoading, isSuccess, isError, error } = useGetNovelsQuery();
  //   let novel;
  //   if (isLoading) {
  //     novel = 'Loading...';
  //   } else if (isSuccess) {
  //     let loadedNovels = Object.values(data.entities).sort((a, b) =>
  //       b.createdAt.localeCompare(a.createdAt)
  //     );
  //     novel = loadedNovels.map((novel) => {
  //       return (
  //         <Card
  //           direction={'row'}
  //           key={novel.id}
  //           w={'100%'}
  //           p={0}
  //           //   onClick={() => {
  //           //     setSelectedNovel(novel);
  //           //   }}
  //           _hover={{
  //             bg: 'gray.50',
  //           }}
  //         >
  //           <CardBody p={3}>
  //             <HStack align={'center'}>
  //               <Image
  //                 src={`${dl_url}/download/${
  //                   novel.thumbnail
  //                     ? novel.thumbnail
  //                     : novel.image
  //                     ? novel.image.thumbnail
  //                     : ''
  //                 }`}
  //                 maxH={'30px'}
  //               />
  //               <VStack align={'flex-start'}>
  //                 <HandleText
  //                   bold={'semi-bold'}
  //                   text={novel.name}
  //                   fontSize={'12px'}
  //                   base={20}
  //                 />
  //                 {/* <HandleText
  //                     text={novel.description}
  //                     fontSize={'12px'}
  //                     base={20}
  //                     sm={20}
  //                     md={20}
  //                     lg={20}
  //                     xl={20}
  //                   /> */}
  //               </VStack>
  //             </HStack>
  //           </CardBody>
  //         </Card>
  //       );
  //     });
  //   } else if (isError) {
  //     novel = `Something went wrong! ${error?.message}`;
  //   }
  const navigate = useNavigate();
  const { novel, errorMsg, load } = FetchNovel();
  let loadedNovel;
  if (novel) {
    loadedNovel = novel.slice(0, 4).map((novel) => {
      return (
        <Card
          w={"125px"}
          p={0}
          overflow={"hidden"}
          key={novel.id}
          onClick={() => navigate(`/${novel.slug ? novel.slug : novel.id}`)}
        >
          <CardBody p={3} alignContent={"center"}>
            <Image
              src={`${dl_url}/download/files/${
                novel.image ? novel.image.filename : ""
              }`}
              h={"120px"}
              maxH={"120px"}
            />
          </CardBody>
          <CardFooter p={3}>
            <Text fontSize={"12px"}>{novel.name}</Text>
          </CardFooter>
        </Card>
      );
    });
  } else {
    loadedNovel = "no novel found";
  }
  return (
    <HStack
      flexWrap={"wrap"}
      w={"100%"}
      gap={5}
      justify={loadedNovel.length >= 4 ? "space-between" : "flex-start"}
    >
      {loadedNovel}
    </HStack>
  );
};

export default Trending;
