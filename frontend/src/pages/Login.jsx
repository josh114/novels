import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useState } from "react";
import { setCredentials } from "../features/auth/authSlice";
import usePersist from "../hooks/usePersist";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [setPersist] = usePersist();
  const dispatch = useDispatch();
  const toast = useToast();
  const [login] = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, user } = await login({
        email,
        password,
      }).unwrap();
      localStorage.setItem("persist", true);
      dispatch(setCredentials({ accessToken, user }));
      setPersist((prev) => !prev);
      setEmail("");
      setPassword("");
      navigate("/admin/dash");
      toast({
        title: "Login Successful",
        position: "top-right",
        variant: "left-accent",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.log("this is login error", err);
      toast({
        title: err.data.message,
        position: "top-right",
        variant: "left-accent",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Box w={"100vw"} minH={"100vh"}>
      <Flex
        w={"100vw"}
        minH={"100vh"}
        h={"100vh"}
        align={"center"}
        justify={"center"}
      >
        <Flex
          w={"80%"}
          h={"80%"}
          bg={"rgba(255, 255, 255, 0.8)"}
          borderRadius={"20px"}
        >
          <form className="form" onSubmit={handleSubmit}>
            <VStack w={{ base: "80%", md: "60%" }} gap={7}>
              <Heading as={"h1"}>Novel Kona </Heading>
              <Text display={{ base: "none", md: "block" }}>
                welcome to novel world...
              </Text>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  required
                  focusBorderColor="teal"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>Email is required</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  required
                  focusBorderColor="teal"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>Please enter password</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="teal" w={"100%"}>
                Sign in
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
<>
  <Flex minHeight={"100vh"} w={"100vw"} bg={""}>
    <Flex w={"100%"} h={"100%"}>
      <Flex
        w={"40%"}
        bg={"orange.300"}
        h={"100vh"}
        display={{ base: "none", md: "block" }}
      >
        09018044297,09015306987
      </Flex>
      <Flex grow={1} align={"center"} justify={"center"}></Flex>
    </Flex>
  </Flex>
</>;
