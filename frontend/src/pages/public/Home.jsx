import {
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import banner from '../../assets/library3.jpg';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import NovelCard from '../../components/NovelCard';

import { useGetNovelsQuery } from '../../features/getNovelSlice';
import Recommended from '../../components/Recommended';
import Socials from '../../components/Socials';

const Home = () => {
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
            <Heading size={'xs'} color={'blackAlpha.800'}>
              Trying to figure out what to read next?
            </Heading>
            <Text fontSize={'13px'}>
              See what others are reading, help your self to any of the books on
              our collection
            </Text>
          </VStack>
          <VStack align={'start'} p={'30px'}>
            <Text fontSize={'13px'}>
              Follow us to get latest updates swiftly
            </Text>
            <Socials />
          </VStack>
        </Flex>

        <Flex p={'50px'} gap={6} flexWrap={'wrap'}></Flex>
      </Flex>
      <Flex
        w={'300px'}
        minH={'100%'}
        justify={'center'}
        border={'1px solid'}
        borderLeftColor={'#eaeaea !important'}
        borderColor={'white'}
      >
        <Recommended />
      </Flex>
    </Flex>
  );
};

export default Home;
