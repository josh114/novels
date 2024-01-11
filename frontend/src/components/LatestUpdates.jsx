import { Flex, Text } from '@chakra-ui/react';
import { useGetUpdatesQuery } from '../features/chapterSlice';
import { NavLink } from 'react-router-dom';

const LatestUpdates = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUpdatesQuery();
  let updates;
  if (isLoading) {
    updates = 'Loading...';
  } else if (isError) {
    updates = error?.message;
  } else if (isSuccess) {
    const loadedUpdates = Object.values(data.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    updates = loadedUpdates.map((update) => {
      return (
        <NavLink key={update.id} to={`/chapter/${update.slug}`}>
          <Text
            fontSize={'12px'}
            color={'teal.600'}
            _hover={{ color: 'teal.800' }}
          >
            {update.novel} chapter {update.chapter}
          </Text>
        </NavLink>
      );
    });
  }
  return (
    <Flex w={'100%'} direction={'column'}>
      {updates}
    </Flex>
  );
};

export default LatestUpdates;
