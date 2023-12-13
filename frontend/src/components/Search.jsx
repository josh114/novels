import React from 'react';
import { LuSearch } from 'react-icons/lu';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
const Search = () => {
  return (
    <InputGroup w={{ base: '80%', sm: '70%', md: '60%', lg: '50%' }} gap={3}>
      <InputLeftElement
        bg={'orange.500'}
        overflow={'hidden'}
        borderRadius={'5px 0 0 5px'}
      >
        <Icon as={LuSearch} color={'white'} />
      </InputLeftElement>
      <Input placeholder='Search' focusBorderColor='orange.400' />
    </InputGroup>
  );
};

export default Search;
