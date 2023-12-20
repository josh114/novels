import { useState } from "react";
import { useGetUploadsQuery } from "../features/UploadSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { dl_url } from "../config/url";
const MediaLibrary = ({ onFileSelected, isOpen, onOpen, onClose }) => {
  const [file, setFile] = useState({});
  const { data, isLoading, isSuccess, isError, error } = useGetUploadsQuery();
  const handleFileSelected = (file) => {
    onFileSelected(file);
    return onClose();
  };

  let uploads;
  if (isLoading) {
    uploads = <Text>Loading...</Text>;
  } else if (isError) {
    console.log(error);
    uploads = <Text>{error}</Text>;
  } else if (isSuccess) {
    let loadedUploads = Object.values(data.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    // console.log(loadedUploads);
    uploads = loadedUploads.map((upload) => {
      return (
        <Card
          w={"200px"}
          p={"0"}
          boxShadow={"0 10px 20px rgba(0,0,0, 0.25)"}
          key={upload.id}
          onClick={() => {
            setFile(upload);
          }}
          border={file.id === upload.id ? "2px solid orange" : ""}
        >
          <CardBody p={"0"} w={"100%"}>
            <Flex w={"100%"} justify={"center"}>
              <Image src={`${dl_url}/download/${upload.thumbnail}`} />
            </Flex>
          </CardBody>
          <CardFooter p={0}>
            <Flex maxW={"150px"}>
              <Text fontSize={"14px"} textAlign={"center"}>
                {upload.title}
              </Text>
            </Flex>
          </CardFooter>
        </Card>
      );
    });
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader borderBottom={"1px solid #eaeaea"}>
          <HStack>
            <Heading size={"sm"}>Uploads</Heading>
          </HStack>
        </ModalHeader>
        <ModalBody p={"20px"}>
          <Flex w={"100%"} flexWrap={"wrap"} gap={5} overflowY={"auto"}>
            {uploads}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w={"100%"} justify={"end"}>
            <Button
              onClick={() => handleFileSelected(file)}
              colorScheme="orange"
            >
              Select File
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MediaLibrary;
