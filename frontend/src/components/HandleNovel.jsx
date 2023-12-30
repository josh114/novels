import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Heading,
  Input,
  HStack,
  Icon,
  Text,
  Card,
  CardBody,
  Image,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useGetNovelsQuery } from '../features/getNovelSlice';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  // MdContentCopy,
} from 'react-icons/md';
import HandleText from './HandleText';
import { dl_url } from '../config/url';

const HandleNovel = ({ onNovelSelected, isOpen, onOpen, onClose }) => {
  const [selectedNovel, setSelectedNovel] = useState({});
  const [page, setPage] = useState(1);
  const handleSelectedNovel = (novel) => {
    onNovelSelected(novel);
    return onClose();
  };

  const { data, isLoading, isSuccess, isError, error } = useGetNovelsQuery();
  let novel;
  let perPage = 8;
  let content;
  let totalPages;
  let items;
  let paginatedData;
  let buttons;
  if (isLoading) {
    novel = 'Loading...';
  } else if (isSuccess) {
    let loadedNovels = Object.values(data.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    content = loadedNovels;
    paginatedData = content.slice((page - 1) * perPage, page * perPage);
    console.log(paginatedData);
    totalPages = content.length / perPage;
    if (totalPages % 1 != 0) {
      if (Math.round(totalPages) - totalPages >= 0) {
        totalPages = Math.round(totalPages);
      } else if (totalPages - Math.round(totalPages) < 0.5) {
        totalPages = Math.round(totalPages) + 1;
      }
    }
    items = content.length;
    novel = loadedNovels.map((novel) => {});
  } else if (isError) {
    novel = `Something went wrong! ${error?.message}`;
  }
  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  buttons = (
    <HStack>
      <Text fontSize={'12px'}>{items} items</Text>
      <Button
        colorScheme='teal'
        size={'xs'}
        onClick={() => handlePagination(1)}
        isDisabled={page === 1}
      >
        <Icon as={MdKeyboardDoubleArrowLeft} />
      </Button>
      <Button
        colorScheme='teal'
        size={'xs'}
        onClick={() => handlePagination(page - 1)}
        isDisabled={page === 1}
      >
        <Icon as={MdKeyboardArrowLeft} />
      </Button>
      <Input
        type='text'
        value={page}
        w={'30px'}
        size={'xs'}
        fontSize={'12px'}
        onChange={(e) => setPage(Number(e.target.value))}
        disabled={totalPages === 1}
      />
      <Text fontSize={'12px'}>of {totalPages}</Text>
      <Button
        size={'xs'}
        colorScheme='teal'
        isDisabled={page === totalPages || totalPages === 0}
        onClick={() => handlePagination(page + 1)}
      >
        <Icon as={MdKeyboardArrowRight} />
      </Button>
      <Button
        size={'xs'}
        colorScheme='teal'
        isDisabled={page === totalPages || totalPages === 0}
        onClick={() => handlePagination(totalPages)}
      >
        <Icon as={MdKeyboardDoubleArrowRight} />
      </Button>
    </HStack>
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
      <ModalOverlay />
      <ModalContent maxH={'80%'}>
        <ModalCloseButton />
        <ModalHeader>
          <Flex flexDir={'column'} gap={5}>
            <Heading fontSize={'14px'}>Select Novel</Heading>
            <Input
              type='text'
              placeholder='search'
              w={{ base: '100%', lg: '300px', xl: '400px' }}
              mt={{ base: '20px', lg: '0' }}
              focusBorderColor='teal.400'
              // onChange={handleChange}
              size={'sm'}
              borderRadius={'5px'}
            />
            {buttons}
          </Flex>
        </ModalHeader>
        <ModalBody h={'100%'} overflowY={'auto'}>
          <Flex
            h={'100%'}
            overflowY={'auto'}
            w={'100%'}
            flexDir={'column'}
            gap={5}
          >
            {paginatedData ? (
              paginatedData.map((novel) => (
                <Card
                  direction={'row'}
                  key={novel.id}
                  w={'100%'}
                  p={0}
                  onClick={() => {
                    setSelectedNovel(novel);
                  }}
                  _hover={{
                    bg: 'gray.50',
                    //   borderColor: 'gray.300',
                  }}
                  border={selectedNovel.id === novel.id ? '2px solid teal' : ''}
                  bg={selectedNovel.id === novel.id ? 'gray.50' : ''}
                >
                  <CardBody p={3}>
                    <HStack align={'center'}>
                      <Image
                        src={`${dl_url}/download/${
                          novel.thumbnail
                            ? novel.thumbnail
                            : novel.image
                            ? novel.image.thumbnail
                            : ''
                        }`}
                        maxH={'50px'}
                      />
                      <VStack align={'flex-start'}>
                        <Heading fontSize={'14px'}>{novel.name}</Heading>
                        <HandleText
                          text={novel.description}
                          fontSize={'12px'}
                        />
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Text>No novels found</Text>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            size={'sm'}
            onClick={() => handleSelectedNovel(selectedNovel)}
          >
            Select
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HandleNovel;

{
  /* <Pagination
  page={page}
  totalPages={totalPages}
  onPrev={() => handlePagination(page - 1)} 
  onNext={() => handlePagination(page + 1)}
  onFirst={() => handlePagination(1)}
  onLast={() => handlePagination(totalPages)} 
/> */
}
