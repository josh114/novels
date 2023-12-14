import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import banner from '../assets/library3.jpg';

const Home = () => {
  return (
    <Flex w={'100%'}>
      <Flex width={'100%'} h={'280px'}>
        <Image src={banner} objectFit={'cover'} mt={'8px'} />
      </Flex>
      <Flex
        w={'300px'}
        minH={'100%'}
        justify={'center'}
        border={'1px solid'}
        borderLeftColor={'#eaeaea'}
        borderTopColor={'white'}
      >
        <Text>Recommended</Text>
      </Flex>
    </Flex>
  );
};

export default Home;
