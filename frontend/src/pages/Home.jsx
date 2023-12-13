import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import banner from '../assets/library3.jpg';

const Home = () => {
  return (
    <Flex w={'100%'}>
      <Flex width={'100%'} h={'250px'}>
        <Image src={banner} objectFit={'cover'} />
      </Flex>
    </Flex>
  );
};

export default Home;
