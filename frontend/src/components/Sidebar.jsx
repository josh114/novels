import { Flex, Heading, Image } from '@chakra-ui/react';
import novel from '../assets/novels.png';

const Sidebar = () => {
  return (
    <Flex
      w={'220px'}
      minH={'100vh'}
      bg={''}
      border={'1px solid'}
      borderRightColor={'#eaeaea'}
      flexDir={'column'}
      p={'20px'}
    >
      <Flex align={'center'} w={'100%'} justify={'center'} m={'30px 0'}>
        <Image src={novel} maxW={'50px'} />
        <Heading size={'xs'} color={'teal.700'}>
          Novel Kona
        </Heading>
      </Flex>
      <Heading size={'xs'} color={'gray.600'}>
        Latest Updates
      </Heading>
    </Flex>
  );
};

export default Sidebar;
