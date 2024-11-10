import React from 'react';

import { Button, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import { useGetSingleChapterQuery } from '../../features/chapterSlice';
import HandleDateFormat from '../../components/HandleDateFormat';
import ChapterService from '../../service/api_service';
import { useEffect } from 'react';
import FetchChapter from '../../components/FetchChapter';

const PubChapter = () => {
  const { chapterId } = useParams();
  const [chap, setChap] = React.useState(null);
  const [nextChap, setNextChap] = React.useState(null);
  const [novSlug, setNovSlug] = React.useState(null);
  const [chapSlug, setChapSlug] = React.useState(null);
  
  // let chap = FetchChapter(chapterId);
  // let nextChap;
  // let novSlug;
  // let chapSlug;

 
  
  const getChapter = async (chapterId) => {
    try {
      // const chapter = await FetchChapter(chapterId);
      // setChap(chapter);
      if (typeof(chap) === 'object'){
        if (chap.chapter < chap.count) {
          setNextChap(chap.chapter + 1);
        } 
        setChapSlug(chap.slug);
        setNovSlug(chap.novel.slug);
        console.log(chap);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(()=> {
    getChapter(chapterId);
  }, [chapterId])

  return (
    <Flex w={'100%'}>
      <Flex w={'100%'} flexDir={'column'}>
        <Text>this is </Text>
        {/* <HStack w={'100%'} mt={'20px'} justify={'space-between'} p={'0 50px'}>
          <HStack>
            <NavLink to={'/'}>
              <Text fontSize={'12px'} _hover={{ color: 'teal.500' }}>
                Home
              </Text>
            </NavLink>
            <Text p={'0 10px'} fontSize={'14px'} color={'gray.500'}>
              /
            </Text>
            <NavLink to={`/${chap.novel ? chap.novel.slug : '#'}`}>
              <Text fontSize={'12px'} _hover={{ color: 'teal.500' }}>
                {chap.novel ? chap.novel.name.toLowerCase() : 'novel'}
              </Text>
            </NavLink>
            <Text p={'0 10px'} fontSize={'14px'} color={'gray.500'}>
              /
            </Text>
            <NavLink
              to={`/${chap.novel ? chap.novel.slug : '#'}/${
                chap.slug ? chap.slug : '#'
              }`}
            >
              <Text fontSize={'12px'} _hover={{ color: 'teal.500' }}>
                {chap.slug ? `chapter ${chap.chapter}` : 'chapter'}
              </Text>
            </NavLink>
          </HStack>
          <Button size={'xs'} colorScheme='teal'>
            Bottom
          </Button>
        </HStack>
        <Flex w={'100%'} justify={'center'}>
          <Flex
            w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
            flexDir={'column'}
            align={'center'}
            m={'20px 0'}
            gap={'30px'}
          >
            <Heading>{chap.novel ? chap.novel.name : 'novel'}</Heading>
            <Flex w={'100%'} justify={'end'}>
              <VStack>
                <Text fontSize={'12px'}>
                  Posted on:{' '}
                  {chap.createdAt ? (
                    <HandleDateFormat date={chap.createdAt} />
                  ) : (
                    ''
                  )}
                </Text>
                <Text fontSize={'12px'}>
                  Updated on:{' '}
                  {chap.updatedAt ? (
                    <HandleDateFormat date={chap.updatedAt} />
                  ) : (
                    ''
                  )}
                </Text>
              </VStack>
            </Flex>
            <Heading size={'xs'} color={'gray.600'}>
              Chapter {chap.chapter ? chap.chapter : 0}
            </Heading>
            <Flex>
              {chap.content ? (
                <div
                  className='main_content'
                  dangerouslySetInnerHTML={{ __html: chap.content }}
                />
              ) : (
                'no content'
              )}
            </Flex>
            <Flex w={'100%'} justify={'center'}>
              {nextChap ? (
                <NavLink to={`/${novSlug}/${novSlug}-chapter-${nextChap}`}>
                  <Text>Chapter {nextChap}</Text>
                </NavLink>
              ) : (
                <Text>The End</Text>
              )}
            </Flex>
          </Flex>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default PubChapter;
