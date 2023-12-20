import { Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { dl_url } from "../config/url";
import MediaLibrary from "./MediaLibrary";

const Poster = ({ handleId, type, reset }) => {
  const [movie, setMovie] = useState({});
  const handlePoster = (file) => {
    setMovie(file);
    handleId(file.id);
  };
  if (reset) {
    setMovie({});
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex onClick={onOpen} w={"100%"} h={"100%"} justify={"center"}>
      <Flex
        display={movie.thumbnail ? "flex" : "none"}
        w={"100%"}
        h={"100%"}
        justify={"center"}
      >
        <Image
          src={
            movie.thumbnail ? `${dl_url}/download/files/${movie.filename}` : ""
          }
          maxW={"80%"}
        />
      </Flex>
      <Button
        variant={"unstyled"}
        size={"sm"}
        display={movie.thumbnail ? "none" : "block"}
      >
        Add {type || "Movie"} Poster
      </Button>
      <MediaLibrary
        onFileSelected={handlePoster}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default Poster;
