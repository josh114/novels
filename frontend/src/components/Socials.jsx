import { Flex, HStack, Icon } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Socials = () => {
  return (
    <HStack gap={5}>
      <Flex
        color={'teal'}
        w={'40px'}
        h={'40px'}
        borderRadius={'10px'}
        _hover={{ bg: 'teal', color: 'white' }}
        justify={'center'}
        align={'center'}
      >
        <Icon as={FaTelegramPlane} fontSize={'23px'} />
      </Flex>
      <Flex
        color={'teal'}
        w={'40px'}
        h={'40px'}
        borderRadius={'10px'}
        _hover={{ bg: 'teal', color: 'white' }}
        justify={'center'}
        align={'center'}
      >
        <Icon as={FaXTwitter} fontSize={'23px'} />
      </Flex>
    </HStack>
  );
};

export default Socials;
