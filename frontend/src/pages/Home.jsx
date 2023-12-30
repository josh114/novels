import {
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import banner from '../assets/library3.jpg';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import NovelCard from '../components/NovelCard';
import book from '../assets/book.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import { useGetNovelsQuery } from '../features/getNovelSlice';

const Home = () => {
  const img = {
    image: book,
    title: 'Always been yours',
  };
  const img2 = {
    image: book2,
    title: 'All too late',
  };
  const img3 = {
    image: book3,
    title: 'A moment in Destiny',
  };
  const { data, isLoading, isError, error, isSuccess } = useGetNovelsQuery();
  if (isLoading) console.log('loading');
  if (isError) console.log(error);
  if (isSuccess) console.log(data);

  return (
    <Flex w={'100%'}>
      <Flex width={'100%'} flexDirection={'column'}>
        <Image src={banner} objectFit={'cover'} mt={'8px'} />

        <Flex w={'100%'}>
          <VStack gap={5} w={'40%'} align={'start'} p={'30px'}>
            <Heading size={'h5'} color={'blackAlpha.800'}>
              Trying to figure out what to read next?
            </Heading>
            <Text fontSize={'14px'}>
              See what others are reading, help your self to any of the books on
              our collection
            </Text>
          </VStack>
          <VStack align={'start'} p={'30px'}>
            <Text>Follow us to get latest updates swiftly</Text>
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
          </VStack>
        </Flex>

        <Flex p={'50px'} gap={6} flexWrap={'wrap'}></Flex>
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
