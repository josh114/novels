import {
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';

const Navbar = () => {
  return (
    <Flex
      w={'100%'}
      h={'50px'}
      bg={'white'}
      boxShadow={'0 1px 7px rgba(0,0,0, .1)'}
    >
      <Flex w={'100%'} justify={'space-around'}>
        <HStack fontSize={'13px'} gap={12}>
          <NavLink>
            <Text _hover={{ color: 'teal' }}>Home</Text>
          </NavLink>
          <NavLink>
            <Text _hover={{ color: 'teal' }}>Trending</Text>
          </NavLink>
          <NavLink>
            <Text _hover={{ color: 'teal' }}>Categories</Text>
          </NavLink>
          <NavLink>
            <Text _hover={{ color: 'teal' }}>Latest</Text>
          </NavLink>
        </HStack>

        <Flex w={'50%'}>
          <HStack w={'100%'} justify={'space-around'}>
            <InputGroup
              //   w={{ base: '80%', sm: '70%', md: '60%', lg: '50%' }}
              w={'70%'}
              size={'sm'}
            >
              <InputLeftElement
                // bg={'orange.500'}
                overflow={'hidden'}
                ml={'10px'}
                // borderRadius={'5px 0 0 5px'}
              >
                <Icon as={LuSearch} color={'gray'} />
              </InputLeftElement>
              <Input
                placeholder='Search'
                focusBorderColor='teal.400'
                ml={'10px'}
                color={'black'}
              />
            </InputGroup>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
