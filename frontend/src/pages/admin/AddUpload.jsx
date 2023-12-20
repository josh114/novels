import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { GrCloudUpload } from "react-icons/gr";
import { FaPhotoVideo } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { upload_url } from "../../config/url";
import { useAddUploadMutation } from "../../features/UploadSlice";
const AddUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [addUpload] = useAddUploadMutation();
  const handleChange = (e) => {
    setFile(e.target.files ? e.target.files[0] : null);
    // console.log(file.name);
  };
  const handleUpload = async () => {
    console.log(progress.started);
    try {
      if (!file) {
        setMsg("no file selected");
        return;
      }
      const fd = new FormData();
      fd.append("video", file);
      setMsg("Uploading");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });
      axios
        .post(upload_url + "/upload", fd, {
          onUploadProgress: (ProgressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: ProgressEvent.progress * 100 };
            });
            // console.log(ProgressEvent.progress * 100);
          },
          headers: {
            "Custom-Header": "value",
          },
        })
        .then((res) => {
          setMsg("Upload successful");
          console.log(res.data);
          setFile(null);
          setTimeout(() => {
            setMsg(null);
            setProgress((prevState) => {
              return { ...prevState, started: false };
            });
          }, 10000);
          addUpload();
        })
        .catch((err) => {
          setMsg("Upload failed");
          console.error(err);
        });
    } catch (err) {
      console.log(err?.message);
    }
  };
  return (
    <Flex w={"100%"} p={{ base: "15px", md: "25px", lg: "30px" }} h={"100%"}>
      <Flex
        w={"100%"}
        // bg={"blackAlpha.200"}
        borderRadius={"10px"}
        align={"center"}
        // align={'center'}
        flexDir={"column"}
        position={"relative"}
      >
        <Flex
          position={"absolute"}
          color={"black"}
          top={"20px"}
          left={"20px"}
          fontSize={"20px"}
          flexDir={"column"}
          align={"center"}
          w={"40px"}
          h={"40px"}
          borderRadius={"10px"}
          _hover={{ bg: "gray.100", color: "teal.400" }}
          justify={"center"}
          onClick={() => navigate("/admin/upload")}
        >
          <Icon as={BsArrowLeft} />
        </Flex>
        <Flex
          width={{ base: "90%", md: "80%", lg: "70%" }}
          h={"200px"}
          border={"2px dashed #eaeaea"}
          borderRadius={"10px"}
          mt={"70px"}
        >
          <FormControl w={"100%"} h={"100%"}>
            <FormLabel
              htmlFor="upload"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
              h={"100%"}
            >
              <Flex
                width={["80%", "70%", "60%", "50%"]}
                p={"10px 0"}
                bg={"teal.400"}
                align={"center"}
                justify={"center"}
                color={"white"}
                borderRadius={"10px"}
              >
                <Text>Choose Files</Text>
                <Icon as={GrCloudUpload} color={"teal.800"} ml={"20px"} />
              </Flex>
              <Input
                id="upload"
                display={"none"}
                type="file"
                color={"black"}
                onChange={handleChange}
              />
            </FormLabel>
          </FormControl>
        </Flex>
        <Flex flexDir={"column"} w={"100%"} align={"center"} mt={"20px"}>
          {progress.started ? (
            <progress value={progress.pc} max={"100"}></progress>
          ) : (
            ""
          )}
          {msg && <Text color={"white"}>{msg}</Text>}
        </Flex>
        <Flex
          width={{ base: "90%", md: "80%", lg: "70%" }}
          p={["10px", "15px", "20px"]}
          bg={"gray.50"}
          mt={"50px"}
          borderRadius={"10px"}
          justify={"space-between"}
          display={file ? "flex" : "none"}
          flexDir={["column", "column", "column", "row"]}
          align={"center"}
        >
          <HStack color={"black"}>
            <Icon
              as={FaPhotoVideo}
              color={"black"}
              fontSize={"20px"}
              // display={['none', 'block']}
            />
            <VStack align={"start"}>
              <Text fontSize={"13px"}>{file ? file.name : ""}</Text>
              <Text fontSize={"13px"} m={"0"}>
                {file ? Math.round(file.size / 1000000, 2) + "mb" : ""}
              </Text>
            </VStack>
          </HStack>
          <Button
            mt={["20px", "0"]}
            size={"sm"}
            colorScheme="teal"
            w={"fit-content"}
            onClick={handleUpload}
          >
            upload
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddUpload;
