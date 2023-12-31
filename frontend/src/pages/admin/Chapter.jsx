// import React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';
import HandleNovel from '../../components/HandleNovel';
import { useEffect, useState } from 'react';
import { dl_url } from '../../config/url';
import HandleText from '../../components/HandleText';
import { useNavigate } from 'react-router-dom';
import AddChapter from '../../components/AddChapter';
import { useGetChaptersQuery } from '../../features/chapterSlice';
import AdminChapters from '../../components/AdminChapters';
const Chapter = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState({});
  const [chap, setChap] = useState({});

  const handleNovel = (file) => {
    setFile(file);
  };
  const handleSubmit = async () => {};
  return (
    <Flex p={'30px'} w={'100%'} flexDir={'column'} gap={10}>
      <Flex gap={10} w={'100%'}>
        <Flex
          w={'150px'}
          flexDir={'column'}
          bg={'gray.100'}
          borderRadius={'10px'}
          h={'200px'}
          border={'2px dashed'}
          borderColor={'gray.300'}
          justify={'center'}
          align={'center'}
          gap={'10px'}
          onClick={onOpen}
          overflow={'hidden'}
        >
          <Text
            color={'gray.600'}
            fontSize={'13px'}
            display={file.id ? 'none' : 'block'}
          >
            Select Novel
          </Text>
          <Icon
            as={FaPlus}
            color={'gray.400'}
            display={file.id ? 'none' : 'block'}
          />
          <Image
            maxH={'180px'}
            display={file.id ? 'block' : 'none'}
            src={`${dl_url}${file.image ? file.image.download : ''}`}
          />
        </Flex>

        <Flex w={'80%'}>
          <Flex flexDir={'column'} gap={5}>
            <Heading fontSize={'18px'} color={'gray.600'}>
              {file.name ? file.name : ''}
            </Heading>
            <Flex w={'70%'}>
              <HandleText
                text={file.description ? file.description : ''}
                fontSize={'12px'}
                base={50}
                sm={170}
                md={350}
                lg={400}
                xl={500}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'}>
        <VStack w={'100%'}>
          <VStack w={'100%'}>
            <Heading fontSize={'16px'} color={'gray.600'}>
              Add New Chapter
            </Heading>
            <Flex w={'100%'} justify={'center'}>
              <AddChapter novel={file} />
            </Flex>
          </VStack>
          <VStack w={'100%'} mt={'30px'}>
            <Heading fontSize={'16px'} color={'gray.600'}>
              Chapters
            </Heading>
            <VStack>
              {file.id ? (
                <AdminChapters novelId={file.id} />
              ) : (
                'no chapters found'
              )}
            </VStack>
          </VStack>
        </VStack>
      </Flex>
      <HandleNovel
        onNovelSelected={handleNovel}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default Chapter;
